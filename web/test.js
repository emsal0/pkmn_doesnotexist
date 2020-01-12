const { spawn } = require("child_process");

const mlNetProcess = spawn("python3", ["get_pokemon.py", "normal"], {
  cwd: "../ml/",
});

mlNetProcess.stdout.on("data", function(data) {
  console.log(data.toString());
});

mlNetProcess.stderr.on("data", function(data) {
  console.error(data.toString());
});
