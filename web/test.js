const { spawn } = require("child_process");

const process = spawn("python", ["../ml/get_pokemon.py", "normal"]);

process.stdout.on("data", function(data) {
  console.log(data.toString());
});
