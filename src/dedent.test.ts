import dedent from "./dedent";

describe("dedent", () => {
	it("works without interpolation", () => {
		expect(
			dedent`first
				 second
				 third`,
		).toMatchSnapshot();
	});

	it("works with interpolation", () => {
		expect(
			dedent`first ${"line"}
				 ${"second"}
				 third`,
		).toMatchSnapshot();
	});

	it("works with suppressed newlines", () => {
		expect(
			dedent`first \
				 ${"second"}
				 third`,
		).toMatchSnapshot();
	});

	it("works with blank first line", () => {
		expect(dedent`
			Some text that I might want to indent:
				* reasons
				* fun
			That's all.
		`).toMatchSnapshot();
	});

	it("works with multiple blank first lines", () => {
		expect(
			dedent`

				 first
				 second
				 third`,
		).toMatchSnapshot();
	});

	it("works with removing same number of spaces", () => {
		expect(
			dedent`
				 first
						second
							 third
			`,
		).toMatchSnapshot();
	});

	describe("single line input", () => {
		it("works with single line input", () => {
			expect(dedent`A single line of input.`).toMatchSnapshot();
		});

		it("works with single line and closing backtick on newline", () => {
			expect(dedent`
				A single line of input.
			`).toMatchSnapshot();
		});

		it("works with single line and inline closing backtick", () => {
			expect(dedent`
				A single line of input.`).toMatchSnapshot();
		});
	});

	it("can be used as a function", () => {
		expect(
			dedent(`
			A test argument.
		`),
		).toMatchSnapshot();
	});

	describe("function character escapes", () => {
		describe("default behavior", () => {
			it("does not escape backticks", () => {
				expect(dedent(`\``)).toMatchSnapshot();
			});

			it("does not escape dollar signs", () => {
				expect(dedent(`$`)).toMatchSnapshot();
			});

			it("does not escape opening braces", () => {
				expect(dedent(`{`)).toMatchSnapshot();
			});

			it("escapes double-escaped backticks", () => {
				expect(dedent(`\\\``)).toMatchSnapshot();
			});

			it("escapes double-escaped dollar signs", () => {
				expect(dedent(`\\$`)).toMatchSnapshot();
			});

			it("escapes double-escaped opening braces", () => {
				expect(dedent(`\\{`)).toMatchSnapshot();
			});

			it("ignores closing braces", () => {
				expect(dedent(`}`)).toMatchSnapshot();
			});
		});

		describe.each([undefined, false, true])(
			"with escapeSpecialCharacters %s",
			(escapeSpecialCharacters) => {
				test("backticks", () => {
					expect(
						dedent.withOptions({ escapeSpecialCharacters })(`\``),
					).toMatchSnapshot();
				});

				test("dollar signs", () => {
					expect(
						dedent.withOptions({ escapeSpecialCharacters })(`$`),
					).toMatchSnapshot();
				});

				test("opening braces", () => {
					expect(
						dedent.withOptions({ escapeSpecialCharacters })(`{`),
					).toMatchSnapshot();
				});

				test("double-escaped backticks", () => {
					expect(
						dedent.withOptions({ escapeSpecialCharacters })(`\\\``),
					).toMatchSnapshot();
				});

				test("double-escaped dollar signs", () => {
					expect(
						dedent.withOptions({ escapeSpecialCharacters })(`\\$`),
					).toMatchSnapshot();
				});

				test("double-escaped opening braces", () => {
					expect(
						dedent.withOptions({ escapeSpecialCharacters })(`\\{`),
					).toMatchSnapshot();
				});
			},
		);
	});

	describe.each([undefined, false, true])(
		"with trimWhitespace %s",
		(trimWhitespace) => {
			test("with trailing whitespace", () => {
				expect(
					dedent.withOptions({ trimWhitespace })(
						`
						foo---
						bar---
					`.replace(/-/g, " "),
					),
				).toMatchSnapshot();
			});

			test("without trailing whitespace", () => {
				expect(
					dedent.withOptions({ trimWhitespace })(
						`
						foo
						bar
					`.replace(/-/g, " "),
					),
				).toMatchSnapshot();
			});

			test("with leading whitespace", () => {
				expect(
					dedent.withOptions({ trimWhitespace })(`


						foo
					`),
				).toMatchSnapshot();
			});
		},
	);

	describe("string tag character escapes", () => {
		describe("default behavior", () => {
			it("escapes backticks", () => {
				expect(dedent`\``).toMatchSnapshot();
			});

			it("escapes dollar signs", () => {
				expect(dedent`\$`).toMatchSnapshot();
			});

			it("escapes opening braces", () => {
				expect(dedent`\{`).toMatchSnapshot();
			});

			it("ignores closing braces", () => {
				expect(dedent`\}`).toMatchSnapshot();
			});
		});

		describe.each([undefined, false, true])(
			"with escapeSpecialCharacters %s",
			(escapeSpecialCharacters) => {
				test("backticks", () => {
					expect(
						dedent.withOptions({ escapeSpecialCharacters })`\``,
					).toMatchSnapshot();
				});

				test("dollar signs", () => {
					expect(
						dedent.withOptions({ escapeSpecialCharacters })`\$`,
					).toMatchSnapshot();
				});

				test("opening braces", () => {
					expect(
						dedent.withOptions({ escapeSpecialCharacters })`\{`,
					).toMatchSnapshot();
				});
			},
		);
	});

	it("doesn't strip explicit newlines", () => {
		expect(dedent`
			<p>Hello world!</p>\n
		`).toMatchSnapshot();
	});

	it("doesn't strip explicit newlines with mindent", () => {
		expect(dedent`
			<p>
				Hello world!
			</p>\n
		`).toMatchSnapshot();
	});

	it("works with spaces for indentation", () => {
		expect(
			dedent`
      first
        second
          third
      `,
		).toMatchSnapshot();
	});

	it("works with tabs for indentation", () => {
		expect(
			dedent`
			first
				second
					third
			`,
		).toMatchSnapshot();
	});

	it("works with escaped tabs for indentation", () => {
		expect(dedent("\t\tfirst\n\t\t\tsecond\n\t\t\t\tthird")).toMatchSnapshot();
	});

	it("does not replace \\n when called as a function", () => {
		expect(dedent(`\\nu`)).toBe("\\nu");
	});

	describe.each([undefined, false, true])(
		"with alignValues %s",
		(alignValues) => {
			test("with nested text", () => {
				expect(
					dedent.withOptions({ alignValues })`
						Some nested items I want to dedent:
							* first
							${dedent`
								* second
								* third`}
							* fourth
							${dedent`
								* fifth
								* sixth`}
						That's all!
					`,
				).toMatchSnapshot();
			});
		},
	);

	describe("bun environment tests", () => {
		it("preserves unicode", () => {
			expect(dedent`😊`).toBe("😊");
			expect(dedent`弟気`).toBe("弟気");
		});
	});
});
