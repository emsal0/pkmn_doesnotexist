const { spawn } = require("child_process");

const process = spawn("python", ["../get_pokemon.py", ...types]);

process.stdout.on("data", function(data) {
  console.log(data.toString());
});
