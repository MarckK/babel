module.exports = function() {
  const isRightHandSideAnIdentifier = path => {
    return path.node.declarations[0].init.type === "Identifier";
  };

  return {
    visitor: {
      VariableDeclaration(path) {
        const varName = path.node.declarations[0].id.name;
        const binding = path.scope.getOwnBinding(varName);
        if (
          binding.constantViolations.length === 0 &&
          !isRightHandSideAnIdentifier(path)
        ) {
          path.node.kind = "const";
        } else {
          path.node.kind = "let";
        }
      },
    },
  };
};
