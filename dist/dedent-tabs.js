"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dedent;

function dedent(strings) {
  var raw = typeof strings === "string" ? [strings] : strings.raw;
  var result = "";

  for (var i = 0; i < raw.length; i++) {
    result += raw[i].replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`");

    if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
      result += i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
    }
  }

  var lines = result.split("\n");
  var mindent = null;
  lines.forEach(function (l) {
    var m = l.match(/^(\s+)\S+/);

    if (m) {
      var indent = m[1].length;

      if (!mindent) {
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    var m = mindent;
    var whitespaceCharacters = [" ", "\t"];
    result = lines.map(function (l) {
      return whitespaceCharacters.includes(l[0]) ? l.slice(m) : l;
    }).join("\n");
  }

  return result.trim().replace(/\\n/g, "\n");
}
