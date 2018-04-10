// @flow

import { makeDedent } from "../dedent";

describe("makeDedent", () => {
  it('can create a dedent function', () => {
    const dd = makeDedent();
    expect(dd).toBeInstanceOf(Function);
  });

  it("can create a dedent function with default indent", () => {
    const dd = makeDedent("    ");
    expect(dd`
      first ${"line"}
      ${"second"}
      third
    `).toMatchSnapshot();
  });
});
