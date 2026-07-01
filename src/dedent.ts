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
		let hasHiddenBackslashes = false;
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
				const value = alignValues ? alignValue(values[i], result) : values[i];

				if (escapeSpecialCharacters && typeof value === "string") {
					// Hide backslashes coming from an interpolated value so the escape
					// pass below does not unescape them and the value is preserved
					// verbatim (fixes #109).
					result += hideBackslashes(value);
					hasHiddenBackslashes = true;
				} else {
					// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
					result += value;
				}
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

		if (hasHiddenBackslashes) {
			result = revealBackslashes(result);
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

// Interpolated values are shielded from the escape-sequence pass above so a
// backslash sequence like `\t` inside a `${value}` is preserved verbatim
// (fixes #109). Every backslash in a value is swapped for a private-use
// sentinel before the value is assembled and swapped back once the escape pass
// is done; a sentinel the value already contains is encoded too, so value
// content always round-trips. The one gap is a sentinel produced by the escape
// pass itself from a static part (e.g. a literal `\u{E000}` in the template),
// which reveal can't tell apart from a value's sentinel; that needs the
// private-use characters below to appear in a static part, so real input is
// unaffected.
const SENTINEL = "\uE000";
const ENCODED_SENTINEL = "\uE001";

function hideBackslashes(value: string) {
	return value.replace(/[\uE000\\]/g, (char) =>
		char === "\\" ? SENTINEL + SENTINEL : SENTINEL + ENCODED_SENTINEL,
	);
}

function revealBackslashes(text: string) {
	return text.replace(/\uE000([\uE000\uE001])/g, (_, char: string) =>
		char === SENTINEL ? "\\" : SENTINEL,
	);
}
