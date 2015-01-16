"use strict";

function dedent(strings, ...values) {
  // first, perform interpolation
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    // join lines when there is a suppressed newline
    result += strings.raw[i].replace(/\\\n[ \t]*/g, "");
    if (i < values.length) {
      result += values[i];
    }
  }

  // now strip indentation
  let lines = result.trim().split("\n");
  let mindent = null;
  lines.forEach(l => {
    let m;
    if (m = l.match(/^ +/)) {
      let indent = m[0].length;
      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });
  if (mindent === null) return result;
  return lines.map(l => l[0] === " " ? l.slice(mindent) : l).join("\n");
};

module.exports = dedent;
