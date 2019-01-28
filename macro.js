const { createMacro, MacroError } = require("babel-plugin-macros");
const dedent = require("./dist/dedent.js").default;

module.exports = createMacro(prevalMacros);

function prevalMacros({ references, state, babel }) {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === "TaggedTemplateExpression") {
      asTag(referencePath.parentPath.get("quasi"), state, babel);
    } else if (referencePath.parentPath.type === "CallExpression") {
      asFunction(referencePath.parentPath.get("arguments"), state, babel);
    } else {
      throw new MacroError(
        `dedent.macro can only be used as tagged template expression or function call. You tried ${
          referencePath.parentPath.type
        }.`
      );
    }
  });
}

function asTag(quasiPath, { file: { opts: { filename } } }, babel) {
  const { types: t } = babel;
  const string = quasiPath.parentPath.get("quasi").evaluate().value;

  // If evaluate succeeds (string != null), use string literal
  // otherwise, use template literal
  let replacement;
  if (string != null) {
    replacement = t.stringLiteral(dedent(string));
  } else {
    const EXPRESSION = '---EXPR---';

    const originalQuasis = quasiPath.get('quasis').map(quasi => quasi.node);
    const expressions = quasiPath.get('expressions').map(expression => expression.node);
    
    const strings = { raw: originalQuasis.map(quasi => quasi.value.raw) };
    const placeholders = expressions.map(() => EXPRESSION);
    const result = dedent.apply(dedent, [strings].concat(placeholders));

    const {types: t } = babel;
    const quasis = result.split(EXPRESSION).map((value, index) => {
      return t.templateElement({ raw: value, cooked: value }, originalQuasis[index].tail);
    });

    replacement = t.templateLiteral(quasis, expressions);
  }

  quasiPath.parentPath.replaceWith(replacement);
}

function asFunction(argumentsPaths, { file: { opts: { filename } } }, babel) {
  const string = argumentsPaths[0].evaluate().value;
  const { types: t } = babel;

  argumentsPaths[0].parentPath.replaceWith(t.stringLiteral(dedent(string)));
}
