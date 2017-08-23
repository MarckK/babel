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

  const varDeclaratorArray = [];

  // const getDeclaratorNames = path =>
  //   path.scope.block.body[0].declarations[0].id.name;

  //getLocalScope returns array of Var Names in local scope (no duplicates)
  const getLocalScope = (scope, parentScope) => {
    const names = [];
    if (scope !== parentScope) {
      if (Array.isArray(scope.block.body)) {
        scope.block.body.forEach(node => {
          if (node.type === "VariableDeclaration") {
            // node.declarations.map(getDeclaratorNames).forEach(dNames => {
            //   dNames.forEach(name => {
            //     if (names.indexOf(name) === -1) {
            //       names.push(name);
            //     }
            //   });
            // });
            node.declarations.map(declaration => {
              return names.push(declaration.name);
            });
          }
        });
      }
    }
    console.log("names", names);
    return names;
  };
  return {
    visitor: {
      VariableDeclaration(path) {
        //console.log("scope", path.scope);
        if (path.node.kind == "var") {
          const nameofVar = path.node.declarations[0].id.name;
          //console.log("nameofVar", nameofVar);
          varDeclaratorArray.push(nameofVar);
          //console.log("varDeclaratorArray", varDeclaratorArray);
          const numTimesAssigned = varDeclaratorArray.filter(name => {
            return name === nameofVar;
          }).length;

          console.log("numTimesAssigned", numTimesAssigned);
          if (shouldItBeAConstant(path) || numTimesAssigned <= 1) {
            path.node.kind = "const";
          } else {
            path.node.kind = "let";
          }
        }
        const localScopeNames = getLocalScope(
          path.scope,
          path.scope.parentBlock,
        );
        console.log(localScopeNames);
      },
    },
  };
};
