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

		// The final unescape pass below runs on the fully assembled string, after
		// indentation stripping and trimming (see the comment near that pass for
		// why it has to happen there). That means it can't tell a backslash that
		// came from the template's own source from one that came in through an
		// interpolated value. To keep interpolated values byte-for-byte as given,
		// any backslash inside a string value is swapped out for a placeholder
		// before it's appended, then swapped back once the unescaping is done.
		// The placeholder is grown until it's guaranteed not to collide with
		// anything already in the template or its values.
		let backslashPlaceholder = "";
		if (escapeSpecialCharacters) {
			let candidate = "\0dedent\0";
			while (
				raw.some((part) => part.includes(candidate)) ||
				values.some(
					(value) => typeof value === "string" && value.includes(candidate),
				)
			) {
				candidate += candidate;
			}

			backslashPlaceholder = candidate;
		}

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

				if (
					backslashPlaceholder &&
					typeof value === "string" &&
					value.includes("\\")
				) {
					value = value.split("\\").join(backslashPlaceholder);
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
			result = result
				.replace(/\\n/g, "\n")
				.replace(/\\t/g, "\t")
				.replace(/\\r/g, "\r")
				.replace(/\\v/g, "\v")
				.replace(/\\b/g, "\b")
				.replace(/\\f/g, "\f")
				.replace(/\\0/g, "\0")
				.replace(/\\x([\da-fA-F]{2})/g, (_, h: string) =>
					String.fromCharCode(parseInt(h, 16)),
				)
				.replace(/\\u\{([\da-fA-F]{1,6})\}/g, (_, h: string) =>
					String.fromCodePoint(parseInt(h, 16)),
				)
				.replace(/\\u([\da-fA-F]{4})/g, (_, h: string) =>
					String.fromCharCode(parseInt(h, 16)),
				);
		}

		// Workaround for Bun issue with Unicode characters
		// https://github.com/oven-sh/bun/issues/8745
		if (typeof Bun !== "undefined") {
			result = result.replace(
				// Matches e.g. \\u{1f60a} or \\u5F1F
				/\\u(?:\{([\da-fA-F]{1,6})\}|([\da-fA-F]{4}))/g,
				(_, braced?: string, unbraced?: string) => {
					const hex = braced ?? unbraced ?? "";
					return String.fromCodePoint(parseInt(hex, 16));
				},
			);
		}

		if (backslashPlaceholder) {
			result = result.split(backslashPlaceholder).join("\\");
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
