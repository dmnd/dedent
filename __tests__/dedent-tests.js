jest.dontMock("../dedent");

describe("dedent", () => {
  it("works without interpolation", () => {
    let dd = require("../dedent");
    let result = dd`first
                    second
                    third`;
    expect(result).toBe("first\nsecond\nthird");
  });

  it("works with interpolation", () => {
    let dd = require("../dedent");
    let result = dd`first ${"line"}
                    ${"second"}
                    third`;
    expect(result).toBe("first line\nsecond\nthird");
  });

  it("works with suppressed newlines", () => {
    let dd = require("../dedent");
    let result = dd`first \
                    ${"second"}
                    third`;
    expect(result).toBe("first second\nthird");
  });

  it("works with blank first line", () => {
    let dd = require("../dedent");
    let result = dd`
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
