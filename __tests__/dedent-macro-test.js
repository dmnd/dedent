import pluginTester from "babel-plugin-tester";
import plugin from "babel-plugin-macros";

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    {
      title: "as a function",
      code: `
        import dedent from "../macro";

        dedent(\`
          some stuff
        \`);
      `
    },
    {
      title: "as a template string",
      code: `
        import dedent from "../macro";

        dedent\`
          some stuff
        \`;
      `
    },
    {
      title: "explicit newline",
      code: `
        import dedent from "../macro";

        dedent\`
          <p>
            Hello world!
          </p>\n
        \`;
      `
    },
    {
      title: "multiple indentations",
      code: `
        import dedent from "../macro";

        dedent\`
            first
              second
                  third
        \`;
      `
    },
    {
      title: "explicit newlines",
      code: `
        import dedent from "../macro";

        dedent\`
          \\n<p>
            Hello world!
          </p>\\n
        \`;
      `
    },
    {
      title: "expressions",
      code: `
        import dedent from "../macro";

        dedent\`
          first ${"line"}
            ${"second"}
            third
        \`;
      `
    },
    {
      title: "evaluated",
      code: `
        import dedent from "../macro";
        import { line, second } from "../external";

        dedent\`
          first \${line}
            \${second}
            third
        \`;
      `
    }
  ]
});
