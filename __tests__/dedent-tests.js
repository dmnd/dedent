/*global jest, describe, it, expect */

"use strict";

jest.dontMock("../dedent");

describe("dedent", () => {
  it("works without interpolation", () => {
    const dd = require("../dedent");
    const result = dd`first
                    second
                    third`;
    expect(result).toBe("first\nsecond\nthird");
  });

  it("works with interpolation", () => {
    const dd = require("../dedent");
    const result = dd`first ${"line"}
                    ${"second"}
                    third`;
    expect(result).toBe("first line\nsecond\nthird");
  });

  it("works with suppressed newlines", () => {
    const dd = require("../dedent");
    const result = dd`first \
                    ${"second"}
                    third`;
    expect(result).toBe("first second\nthird");
  });

  it("works with blank first line", () => {
    const dd = require("../dedent");
    const result = dd`
      Some text that I might want to indent because:
        * reasons
        * fun
      That's all.
    `;

    expect(result).toBe(
      "Some text that I might want to indent because:\n" +
      "  * reasons\n" +
      "  * fun\n" +
      "That's all.");
  });

  describe("single line input", () => {
    const expected = "A single line of input.";

    it("works with single line input", () => {
      const dd = require("../dedent");
      const result = dd`A single line of input.`;
      expect(result).toBe(expected);
    });

    it("works with single line and closing backtick on newline", () => {
      const dd = require("../dedent");
      const result = dd`
        A single line of input.
      `;
      expect(result).toBe(expected);
    });

    it("works with single line and inline closing backtick", () => {
      const dd = require("../dedent");
      const result = dd`
        A single line of input.`;
      expect(result).toBe(expected);
    });
  });

  it("can be used as a function", () => {
    const dd = require("../dedent");
    const arg = `
      A test argument.
    `;
    expect(dd(arg)).toBe("A test argument.");
  });
});
