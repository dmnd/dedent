import type { Dedent, DedentOptions } from "./types.js";

export type * from "./types.js";

const dedent: Dedent = createDedent({});

export default dedent;

function createDedent(options: DedentOptions) {
	dedent.withOptions = (newOptions: DedentOptions): Dedent =>
		createDedent({ ...options, ...newOptions });

	return dedent;

	function dedent(literals: string): string;
	function dedent(strings: TemplateStringsArray, ...values: unknown[]): string;
	function dedent(
		strings: TemplateStringsArray | string,
		...values: unknown[]
	) {
		const raw = typeof strings === "string" ? [strings] : strings.raw;
		const {
			alignValues = false,
			escapeSpecialCharacters = Array.isArray(strings),
			trimWhitespace = true,
		} = options;

		// first, perform interpolation
		let result = "";
		for (let i = 0; i < raw.length; i++) {
			let next = raw[i];

			if (escapeSpecialCharacters) {
				// handle escaped newlines, backticks, and interpolation characters
				next = next
					.replace(/\\\n[ \t]*/g, "")
					.replace(/\\`/g, "`")
					.replace(/\\\$/g, "$")
					.replace(/\\\{/g, "{");
			}

			result += next;

			if (i < values.length) {
				let value = alignValues ? alignValue(values[i], result) : values[i];
				if (escapeSpecialCharacters && typeof value === "string") {
					value = value.replace(/\\/g, "\\\\");
				}

				// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
				result += value;
			}
		}

		// now strip indentation
		const lines = result.split("\n");
		let mindent: null | number = null;
		for (const l of lines) {
			const m = l.match(/^(\s+)\S+/);
			if (m) {
				const indent = m[1].length;
				if (!mindent) {
					// this is the first indented line
					mindent = indent;
				} else {
					mindent = Math.min(mindent, indent);
				}
			}
		}

		if (mindent !== null) {
			const m = mindent; // appease TypeScript
			result = lines
				// https://github.com/typescript-eslint/typescript-eslint/issues/7140
				// eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
				.map((l) => (l[0] === " " || l[0] === "\t" ? l.slice(m) : l))
				.join("\n");
		}

		// dedent eats leading and trailing whitespace too
		if (trimWhitespace) {
			result = result.trim();
		}

		// Unescape escapes after trimming so sequences like `\n`, `\t`,
		// `\xHH` and `\u{...}` are preserved (fixes #24)
		if (escapeSpecialCharacters) {
			result = result.replace(
				/\\([\\ntrvbf0]|x([\da-fA-F]{2})|u\{([\da-fA-F]{1,6})\}|u([\da-fA-F]{4}))/g,
				(_, escape: string, x?: string, braced?: string, unbraced?: string) => {
					if (escape === "\\") {
						return "\\";
					}
					if (escape === "n") {
						return "\n";
					}
					if (escape === "t") {
						return "\t";
					}
					if (escape === "r") {
						return "\r";
					}
					if (escape === "v") {
						return "\v";
					}
					if (escape === "b") {
						return "\b";
					}
					if (escape === "f") {
						return "\f";
					}
					if (escape === "0") {
						return "\0";
					}
					const hex = x ?? braced ?? unbraced ?? "";
					return braced
						? String.fromCodePoint(parseInt(hex, 16))
						: String.fromCharCode(parseInt(hex, 16));
				},
			);
		}

		return result;
	}
}

/**
 * Adjusts the indentation of a multi-line interpolated value to match the current line.
 */
function alignValue(value: unknown, precedingText: string) {
	if (typeof value !== "string" || !value.includes("\n")) {
		return value;
	}

	const currentLine = precedingText.slice(precedingText.lastIndexOf("\n") + 1);
	const indentMatch = currentLine.match(/^(\s+)/);
	if (indentMatch) {
		const indent = indentMatch[1];
		return value.replace(/\n/g, `\n${indent}`);
	}

	return value;
}
