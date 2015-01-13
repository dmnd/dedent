jest.dontMock("../dedent");

describe("dedent", function() {
  it("works without interpolation", function() {
    var dd = require("../dedent");
    var result = dd`first
                    second
                    third`;
    expect(result).toBe("first\nsecond\nthird");
  });

  it("works with interpolation", function() {
    var dd = require("../dedent");
    var result = dd`first ${"line"}
                    ${"second"}
                    third`;
    expect(result).toBe("first line\nsecond\nthird");
  });

  it("works with suppressed newlines", function() {
    var dd = require("../dedent");
    var result = dd`first \
                    ${"second"}
                    third`;
    expect(result).toBe("first second\nthird");
  });
});
