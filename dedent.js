"use strict";

function dedent() {
  var strings = arguments[0];

  var result = "";
  for (var i = 0; i < strings.length; i++) {
    var next = strings.raw[i].
      replace(/\\\n[ \t]*/g, "").
      replace(/\n[ \t]*/g, "\n");
    result += next;
    if (i + 1 < arguments.length) {
      result += arguments[i + 1];
    }
  }

  return result;
};

module.exports = dedent;
