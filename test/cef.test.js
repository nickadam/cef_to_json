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

// mcas
test('MCAS labels', () => {
  expect(cef
    .toJson('2021-08-12T07:40:19.546Z CEF:0|MCAS|SIEM_Agent|0.207.251|EVENT_CATEGORY_RUN_COMMAND|Run command|0|externalId=7d2e31d9-2532-440f-a824-409a1c84c47b_76468039_1628754019546_20940 rt=1628754019546 start=1628754019546 end=1628754019546 msg=Run command: SAMR query QueryUser user Bob Newby; Parameters: Count 1, SourceComputerDnsName server.example.com, SourceComputerOperatingSystem windows server 2016 datacenter, SourceComputerOperatingSystemVersion 10.0 (14393), SourceComputerOperatingSystemType windows, DestinationComputerDnsName dc.example.com, DestinationComputerOperatingSystem windows server 2012 r2 datacenter, DestinationComputerOperatingSystemVersion 6.3 (9600), DestinationComputerOperatingSystemType windows, TargetAccountDisplayName Bob Newby, TargetAccountUpnName bob@example.com, DestinationIpAddress 10.0.0.10, SourcePort 61648, DestinationPort 445, Protocol Samr ; Is Success: True suser= destinationServiceName=Active Directory dvc=10.0.0.11 requestClientApplication= cs1Label=portalURL cs1=https://portal.cloudappsecurity.com/#/audits?activity.id\\=eq(7d2e31d9-2532-440f-a824-409a1c84c47b_76468039_1628754019546_20940,) cs2Label=uniqueServiceAppIds cs2=APPID_ACTIVE_DIRECTORY cs3Label=targetObjects cs3=Count,SERVER,SERVER,SourceComputerDnsName,SourceComputerOperatingSystem,SourceComputerOperatingSystemVersion,SourceComputerOperatingSystemType,DC,DestinationComputerDnsName,DestinationComputerOperatingSystem,DestinationComputerOperatingSystemVersion,DestinationComputerOperatingSystemType,TargetAccountDisplayName,TargetAccountUpnName,DestinationIpAddress,SourcePort,DestinationPort,Protocol,SAMR query,Bob Newby,Bob Newby,Bob Newby cs4Label=policyIDs cs4= c6a1Label="Device IPv6 Address" c6a1='))
    .toEqual({
      extension: {
        'Device IPv6 Address': '',
        destinationServiceName: 'Active Directory',
        dvc: '10.0.0.11',
        end: '1628754019546',
        externalId: '7d2e31d9-2532-440f-a824-409a1c84c47b_76468039_1628754019546_20940',
        msg: 'Run command: SAMR query QueryUser user Bob Newby; Parameters: Count 1, SourceComputerDnsName server.example.com, SourceComputerOperatingSystem windows server 2016 datacenter, SourceComputerOperatingSystemVersion 10.0 (14393), SourceComputerOperatingSystemType windows, DestinationComputerDnsName dc.example.com, DestinationComputerOperatingSystem windows server 2012 r2 datacenter, DestinationComputerOperatingSystemVersion 6.3 (9600), DestinationComputerOperatingSystemType windows, TargetAccountDisplayName Bob Newby, TargetAccountUpnName bob@example.com, DestinationIpAddress 10.0.0.10, SourcePort 61648, DestinationPort 445, Protocol Samr ; Is Success: True',
        policyIDs: '',
        portalURL: 'https://portal.cloudappsecurity.com/#/audits?activity.id=eq(7d2e31d9-2532-440f-a824-409a1c84c47b_76468039_1628754019546_20940,)',
        requestClientApplication: '',
        rt: '1628754019546',
        start: '1628754019546',
        suser: '',
        targetObjects: 'Count,SERVER,SERVER,SourceComputerDnsName,SourceComputerOperatingSystem,SourceComputerOperatingSystemVersion,SourceComputerOperatingSystemType,DC,DestinationComputerDnsName,DestinationComputerOperatingSystem,DestinationComputerOperatingSystemVersion,DestinationComputerOperatingSystemType,TargetAccountDisplayName,TargetAccountUpnName,DestinationIpAddress,SourcePort,DestinationPort,Protocol,SAMR query,Bob Newby,Bob Newby,Bob Newby',
        uniqueServiceAppIds: 'APPID_ACTIVE_DIRECTORY',
      },
      header: {
        device_event_class_id: 'EVENT_CATEGORY_RUN_COMMAND',
        device_product: 'SIEM_Agent',
        device_vendor: 'MCAS',
        device_version: '0.207.251',
        name: 'Run command',
        severity: '0',
        version: '0',
      },
      prefix: '2021-08-12T07:40:19.546Z',
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
