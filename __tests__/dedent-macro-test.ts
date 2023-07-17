import plugin from "babel-plugin-macros";
import pluginTester from "babel-plugin-tester";

pluginTester({
	babelOptions: { filename: __filename },
	plugin,
	snapshot: true,
	tests: [
		{
			code: `
        import dedent from "../macro";

        dedent(\`
          some stuff
        \`);
      `,
			title: "as a function",
		},
		{
			code: `
        import dedent from "../macro";

        dedent\`
          some stuff
        \`;
      `,
			title: "as a template string",
		},
		{
			code: `
        import dedent from "../macro";

        dedent\`
          <p>
            Hello world!
          </p>\n
        \`;
      `,
			title: "explicit newline",
		},
		{
			code: `
        import dedent from "../macro";

        dedent\`
            first
              second
                  third
        \`;
      `,
			title: "multiple indentations",
		},
		{
			code: `
        import dedent from "../macro";

        dedent\`
          first ${"line"}
            ${"second"}
            third
        \`;
      `,
			title: "expressions",
		},
	],
});
