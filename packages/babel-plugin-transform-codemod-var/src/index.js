module.exports = function() {
  const isRightHandSideAnIdentifier = path => {
    return path.node.declarations[0].init.type === "Identifier";
  };
  const shouldItBeAConstant = path => {
    if (isRightHandSideAnIdentifier(path)) {
      return false;
    }
    return true;
  };

  return {
    visitor: {
      VariableDeclaration(path) {
        if (path.node.kind == "var") {
          //const nameofVar = path.node.declarations[0].id.name;
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
