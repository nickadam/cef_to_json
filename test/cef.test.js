const cef = require('../src/cef');

test('cef 0.1  event format', () => {
  expect(cef
    .toJson('CEF:0|Security|threatmanager2|1.0|100|worm successfully stopped|10|src=10.0.0.1 dst=2.1.2.2 spt=1232'))
    .toEqual({
      header: {
        version: '0',
        device_vendor: 'Security',
        device_product: 'threatmanager2',
        device_version: '1.0',
        device_event_class_id: '100',
        name: 'worm successfully stopped',
        severity: '10',
      },
      extension: {
        src: '10.0.0.1',
        dst: '2.1.2.2',
        spt: '1232',
      },
    });
});

test('cef 1.0  event format', () => {
  expect(cef
    .toJson('CEF:1|Security|threatmanager2|1.0|100|worm successfully stopped|10|src=10.0.0.1 dst=2.1.2.2 spt=1232'))
    .toEqual({
      header: {
        version: '1',
        device_vendor: 'Security',
        device_product: 'threatmanager2',
        device_version: '1.0',
        device_event_class_id: '100',
        name: 'worm successfully stopped',
        severity: '10',
      },
      extension: {
        src: '10.0.0.1',
        dst: '2.1.2.2',
        spt: '1232',
      },
    });
});

test('Prefix to header', () => {
  expect(cef
    .toJson('Sep 19 08:26:10 host CEF:1|Security|threatmanager2|1.0|100|worm successfully stopped|10|src=10.0.0.1 dst=2.1.2.2 spt=1232'))
    .toEqual({
      header: {
        version: '1',
        device_vendor: 'Security',
        device_product: 'threatmanager2',
        device_version: '1.0',
        device_event_class_id: '100',
        name: 'worm successfully stopped',
        severity: '10',
      },
      extension: {
        src: '10.0.0.1',
        dst: '2.1.2.2',
        spt: '1232',
      },
      prefix: 'Sep 19 08:26:10 host',
    });
});

test('Empty header', () => {
  expect(cef
    .toJson('CEF:1|||||||src=10.0.0.1 dst=2.1.2.2 spt=1232'))
    .toEqual({
      header: {
        version: '1',
        device_vendor: '',
        device_product: '',
        device_version: '',
        device_event_class_id: '',
        name: '',
        severity: '',
      },
      extension: {
        src: '10.0.0.1',
        dst: '2.1.2.2',
        spt: '1232',
      },
    });
});

test('Only header, no extensions', () => {
  expect(cef
    .toJson('Sep 19 08:26:10 host CEF:1|Security|threatmanager2|1.0|100|worm successfully stopped|10|'))
    .toEqual({
      header: {
        version: '1',
        device_vendor: 'Security',
        device_product: 'threatmanager2',
        device_version: '1.0',
        device_event_class_id: '100',
        name: 'worm successfully stopped',
        severity: '10',
      },
      prefix: 'Sep 19 08:26:10 host',
    });
});

test('Invalid header', () => {
  expect(cef
    .toJson('Sep 19 08:26:10 host CEF:1|1.0|100|worm successfully stopped|10|src=10.0.0.1 dst=2.1.2.2 spt=1232'))
    .toBeUndefined();
});

test('Invalid event', () => {
  expect(cef
    .toJson('Random data string'))
    .toBeUndefined();
});
