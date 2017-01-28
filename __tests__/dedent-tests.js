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
      Some text that I might want to indent:
        * reasons
        * fun
      That's all.
    `;

    expect(result).toBe(
      "Some text that I might want to indent:\n" +
      "  * reasons\n" +
      "  * fun\n" +
      "That's all.");
  });

  it("works with multiple blank first lines", () => {
    const dd = require("../dedent");
    const result = dd`

                    first
                    second
                    third`;
    expect(result).toBe("first\nsecond\nthird");
  });

  it("works with removing same number of spaces", () => {
    const dd = require("../dedent");
    const result = dd`
                      first
                         second
                            third
                     `;
    expect(result).toBe("first\n   second\n      third");
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

  it("escapes backticks", () => {
    const dd = require("../dedent");
    expect(dd`\``).toBe('`');
  });

  it("doesn't strip exlicit newlines", () => {
    const dd = require("../dedent");
    const result = dd`
      <p>Hello world!</p>\n
    `;
    expect(result).toBe("<p>Hello world!</p>\n");
  });

  it("doesn't strip exlicit newlines with mindent", () => {
    const dd = require("../dedent");
    const result = dd`
      <p>
        Hello world!
      </p>\n
    `;
    expect(result).toBe("<p>\n  Hello world!\n</p>\n");
  });
});
