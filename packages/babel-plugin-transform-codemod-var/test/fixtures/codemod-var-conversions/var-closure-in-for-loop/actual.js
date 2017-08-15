var f = [];

for (var i = 0; i < 5; i++) {
  f.push(function () {
    return i + 1;
  });
}

f[0]();
f[1]();
f[2]();
f[3]();
f[4]();
