// @flow

export function makeDedent(indent: string = "") {
  return function dedent(
    strings: string | Array<string>,
    ...values: Array<string>
  ) {
    // $FlowFixMe: Flow doesn't undestand .raw
    const raw = typeof strings === "string" ? [strings] : strings.raw;

    // first, perform interpolation
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      result += raw[i]
        // join lines when there is a suppressed newline
        .replace(/\\\n[ \t]*/g, "")
        // handle escaped backticks
        .replace(/\\`/g, "`");

      if (i < values.length) {
        result += values[i];
      }
    }

    // now strip indentation
    const lines = result.split("\n");
    let mindent: number | null = null;
    lines.forEach(l => {
      let m = l.match(/^(\s+)\S+/);
      if (m) {
        let lineIndent = m[1].length;
        if (!mindent) {
          // this is the first indented line
          mindent = lineIndent;
        } else {
          mindent = Math.min(mindent, lineIndent);
        }
      }
    });

    if (mindent !== null) {
      const m = mindent; // appease Flow
      result = lines
        .map(l => indent + (l[0] === " " ? l.slice(m) : l))
        .join("\n");
    }

    return (
      indent +
      result
        // dedent eats leading and trailing whitespace too
        .trim()
        // handle escaped newlines at the end to ensure they don't get stripped too
        .replace(/\\n/g, "\n")
    );
  };
}

// Create the default dedent string tag with no default indent.
const dedent = makeDedent();

export default dedent;
