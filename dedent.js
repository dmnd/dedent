// @flow

export default function dedent(
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
      // handle escaped backticks and interpolation characters
      .replace(/\\`/g, "`")
      .replace(/\\\$/g, "$")
      .replace(/\\{/g, "{");

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
      let indent = m[1].length;
      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    const m = mindent; // appease Flow
    result = lines.map(l => (l[0] === " " || l[0] === "\t") ? l.slice(m) : l).join("\n");
  }

  return result
    // dedent eats leading and trailing whitespace too
    .trim()
    // handle escaped newlines at the end to ensure they don't get stripped too
    .replace(/\\n/g, "\n");
}
