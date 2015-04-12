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
});
