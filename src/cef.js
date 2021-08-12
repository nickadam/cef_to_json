
/**
 * Converts CEF sring to json
 * @param {string} cefOrig The original String which is passed
 * @returns {JSON} Parsed CEF string
 */
function toJson(cefOrig) {
  const cefVerPos = cefOrig.indexOf('CEF:');
  if (cefVerPos < 0) {
    return undefined;
  }

  const cef = cefOrig.substring(cefVerPos).trim();
  const ret = {};

  if (cefVerPos > 0) {
    ret.prefix = cefOrig.substring(0, cefVerPos).trim();
  }

  ret.header = {};

  ret.header.version = cef.charAt(4);
  const headers = cef.split('|');
  if (headers.length < 7) {
    return undefined;
  }

  // extracting headers
  [
    ret.header.device_vendor,
    ret.header.device_product,
    ret.header.device_version,
    ret.header.device_event_class_id,
    ret.header.name,
    ret.header.severity,
  ] = headers.slice(1, 7);

  if (headers.length === 7) {
    return ret;
  }

  // extracting extension fields which are in key=value format
  const re = /(\w*)=/g;
  const str = headers[7];
  const exts = [];
  let m;
  /*eslint-disable*/
  while ((m = re.exec(str)) !== null) {
    exts.push({key: m[1], pos: m.index});
  }
  /* eslint-enable */

  if (exts.length > 0) {
    ret.extension = {};
  }

  exts.forEach((ext, index) => {
    let nextPos;
    if (index === (exts.length - 1)) {
      nextPos = str.length;
    } else {
      nextPos = exts[index + 1].pos;
    }
    ret.extension[ext.key] = str.substring(ext.pos + ext.key.length + 1, nextPos).trim();
  });

  return ret;
}

module.exports = {
  toJson,
};
