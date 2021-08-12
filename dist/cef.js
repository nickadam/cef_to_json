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
    ret.prefix = cefOrig.substring(0, cefVerPos).trim();
  }

  ret.header = {};

  ret.header.version = cef.charAt(4);
  var headers = cef.split('|');
  if (headers.length < 7) {
    return undefined;
  }

  // extracting headers

  var _headers$slice = headers.slice(1, 7);

  var _headers$slice2 = _slicedToArray(_headers$slice, 6);

  ret.header.device_vendor = _headers$slice2[0];
  ret.header.device_product = _headers$slice2[1];
  ret.header.device_version = _headers$slice2[2];
  ret.header.device_event_class_id = _headers$slice2[3];
  ret.header.name = _headers$slice2[4];
  ret.header.severity = _headers$slice2[5];


  if (headers.length === 7) {
    return ret;
  }

  // extracting extension fields which are in key=value format
  var re = /(\w*)=/g;
  var str = headers[7].replace(/\\=/g, 'THERE_IS_AN_EQUAL_SIGN_HERE_BRO');
  var exts = [];
  var m = void 0;
  /*eslint-disable*/
  while ((m = re.exec(str)) !== null) {
    exts.push({ key: m[1], pos: m.index });
  }
  /* eslint-enable */

  if (exts.length > 0) {
    ret.extension = {};
  }

  exts.forEach(function (ext, index) {
    var nextPos = void 0;
    if (index === exts.length - 1) {
      nextPos = str.length;
    } else {
      nextPos = exts[index + 1].pos;
    }
    ret.extension[ext.key.replace(/THERE_IS_AN_EQUAL_SIGN_HERE_BRO/g, '=')] = str.substring(ext.pos + ext.key.length + 1, nextPos).trim().replace(/THERE_IS_AN_EQUAL_SIGN_HERE_BRO/g, '=');
  });

  // replace labels
  if (ret.extension) {
    var keys = Object.keys(ret.extension);
    var labels = keys.filter(function (x) {
      return (/Label$/.test(x)
      );
    });
    labels.forEach(function (label) {
      var valueKey = label.replace(/Label$/, '');
      if (keys.indexOf(valueKey) !== -1) {
        var key = ret.extension[label].replace(/"/g, '');
        var value = ret.extension[valueKey];
        ret.extension[key] = value;
        delete ret.extension[label];
        delete ret.extension[valueKey];
      }
    });
  }

  return ret;
}

module.exports = {
  toJson: toJson
};
