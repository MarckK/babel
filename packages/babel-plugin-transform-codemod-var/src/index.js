module.exports = function() {
  const isRightHandSideAnIndentifier = path => {
    return path.node.declarations[0].init.type === "Identifier";
  };
  const shouldItBeAConstant = path => {
    if (isRightHandSideAnIndentifier(path)) {
      return false;
    }
    return true;
  };
  return {
    visitor: {
      VariableDeclaration(path) {
        if (path.node.kind == "var") {
          if (shouldItBeAConstant(path)) {
            path.node.kind = "const";
          } else {
            path.node.kind = "let";
          }
        }
      },
    },
  };
};
