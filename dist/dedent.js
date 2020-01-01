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
  for (var i = 0; i < raw.length; i++) {
    result += raw[i]
    // join lines when there is a suppressed newline
    .replace(/\\\n[ \t]*/g, "")
    // handle escaped backticks
    .replace(/\\`/g, "`");

    if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
      result += arguments.length <= i + 1 ? undefined : arguments[i + 1];
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
    (function () {
      var m = mindent; // appease Flow
      result = lines.map(function (l) {
        return l[0] === " " ? l.slice(m) : l;
      }).join("\n");
    })();
  }

  if (result.startsWith('\n')) {
    result = result.substr(1);
  }
  return result.replace(/^((.|\n)*)\n[ \t]*?$/, '$1');
}
