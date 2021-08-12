'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Converts CEF sring to json
 * @param {string} cefOrig The original String which is passed
 * @returns {JSON} Parsed CEF string
 */
function toJson(cefOrig) {
  var cefVerPos = cefOrig.indexOf('CEF:');
  if (cefVerPos < 0) {
    return undefined;
  }

  var cef = cefOrig.substring(cefVerPos).trim();
  var ret = {};

  if (cefVerPos > 0) {
    ret.headerPrefix = cefOrig.substring(0, cefVerPos).trim();
  }

  ret.cefVersion = cef.charAt(4);
  var headers = cef.split('|');
  if (headers.length < 7) {
    return undefined;
  }

  // extracting headers

  var _headers$slice = headers.slice(1, 7);

  var _headers$slice2 = _slicedToArray(_headers$slice, 6);

  ret.deviceVendor = _headers$slice2[0];
  ret.deviceProduct = _headers$slice2[1];
  ret.deviceVersion = _headers$slice2[2];
  ret.deviceEventClassId = _headers$slice2[3];
  ret.name = _headers$slice2[4];
  ret.agentSeverity = _headers$slice2[5];


  if (headers.length === 7) {
    return ret;
  }

  // extracting extension fields which are in key=value format
  var re = /(\w*)=/g;
  var str = headers[7];
  var exts = [];
  var m = void 0;
  /*eslint-disable*/
  while ((m = re.exec(str)) !== null) {
    exts.push({ key: m[1], pos: m.index });
  }
  /* eslint-enable */

  exts.forEach(function (ext, index) {
    var nextPos = void 0;
    if (index === exts.length - 1) {
      nextPos = str.length;
    } else {
      nextPos = exts[index + 1].pos;
    }
    ret[ext.key] = str.substring(ext.pos + ext.key.length + 1, nextPos).trim();
  });

  return ret;
}

module.exports = {
  toJson: toJson
};
