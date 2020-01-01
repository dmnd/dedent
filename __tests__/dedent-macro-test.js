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
      title: "expressions",
      code: `
        import dedent from "../macro";

        dedent\`
          first ${"line"}
            ${"second"}
            third
        \`;
      `
    }
  ]
});
