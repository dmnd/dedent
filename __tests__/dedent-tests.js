// @flow

import dd from '../dedent';

describe("dedent", () => {
  it("works without interpolation", () => {
    expect(
      dd`first
         second
         third`
    ).toMatchSnapshot();
  });

  it("works with interpolation", () => {
    expect(
      dd`first ${"line"}
         ${"second"}
         third`
    ).toMatchSnapshot();
  });

  it("works with suppressed newlines", () => {
    expect(
      dd`first \
         ${"second"}
         third`
    ).toMatchSnapshot();
  });

  it("works with blank first line", () => {
    expect(dd`
      Some text that I might want to indent:
        * reasons
        * fun
      That's all.
    `).toMatchSnapshot();
  });

  it("works with multiple blank first lines", () => {
    expect(
      dd`

         first
         second
         third`
    ).toMatchSnapshot();
  });

  it("works with blank last line", () => {
    expect(dd`
      Some text that I might want to indent:
        * reasons
        * fun
      That's all.
    `).toMatchSnapshot();
  });

  it("works with multiple blank last lines", () => {
    expect(
      dd`
         first
         second
         third

      `
    ).toMatchSnapshot();
  });

  it("works with removing same number of spaces", () => {
    expect(
      dd`
         first
            second
               third
      `
    ).toMatchSnapshot();
  });

  describe("single line input", () => {
    it("works with single line input", () => {
      expect(dd`A single line of input.`).toMatchSnapshot();
    });

    it("works with single line and closing backtick on newline", () => {
      expect(dd`
        A single line of input.
      `).toMatchSnapshot();
    });

    it("works with single line and inline closing backtick", () => {
      expect(dd`
        A single line of input.`
      ).toMatchSnapshot();
    });
  });

  it("can be used as a function", () => {
    expect(dd(`
      A test argument.
    `)).toMatchSnapshot();
  });

  it("escapes backticks", () => {
    expect(dd`\``).toMatchSnapshot();
  });
});
