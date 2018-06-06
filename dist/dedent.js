"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dedent;
function dedent(strings) {
  // $FlowFixMe: Flow doesn't undestand .raw
  var raw = typeof strings === "string" ? [strings] : strings.raw;

  // first, perform interpolation
  var result = "";

  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < raw.length; i++) {
    result += raw[i]
    // join lines when there is a suppressed newline
    .replace(/\\\n[ \t]*/g, "")
    // handle escaped backticks
    .replace(/\\`/g, "`");

    if (i < values.length) {
      // Over-indent multiline interpolations so they don't 'fall' to 0
      if (values[i].includes('\n')) {
        var spaces_before_match = result.match(/(?:^|\n)( *)$/);
        if (spaces_before_match && typeof values[i] === 'string') {
          (function () {
            var spaces_before = spaces_before_match[1];
            result += values[i].split('\n').map(function (str, i) {
              return i === 0 ? str : "" + spaces_before + str;
            }).join('\n');
          })();
        } else {
          result += values[i];
        }
      } else {
        result += values[i];
      }
    }
  }

  // now strip indentation
  var lines = result.split("\n");
  var mindent = null;
  lines.forEach(function (l) {
    var m = l.match(/^(\s+)\S+/);
    if (m) {
      var indent = m[1].length;
      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    var m = mindent; // appease Flow
    result = lines.map(function (l) {
      return l[0] === " " ? l.slice(m) : l;
    }).join("\n");
  }

  return result
  // dedent eats leading and trailing whitespace too
  .trim()
  // handle escaped newlines at the end to ensure they don't get stripped too
  .replace(/\\n/g, "\n");
}
