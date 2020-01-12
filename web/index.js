const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { spawn } = require("child_process");

const app = express();
const PORT = process.env.PORT || 8080;
const uri =
  "mongodb+srv://dbUser:dbPass@cluster0-u1ctf.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let pkmnNamesCollection;

client.connect(err => {
  pkmnNamesCollection = client.db("pkmn_doesnotexist").collection("pkmn_names");

  // client.close();
});

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

/**
 * data is of format
 * {
 *  name: string;
 * }
 */
app.post("/api/set-name", function(req, res) {
  pkmnNamesCollection.insertOne({ name: req.body.name, image: req.body.image });
});

app.post("/api/get-image", function(req, res) {
  const types = [];

  if (req.body.type1) types.push(req.body.type1);
  if (req.body.type1) types.push(req.body.type2);

  const mlNetProcess = spawn("python3", ["get_pokemon.py", ...types], {
    cwd: "../ml/",
  });

  mlNetProcess.stdout.on("data", function(data) {
    res.end(data.toString());
  });

  mlNetProcess.stderr.on("data", function(data) {
    console.error(data.toString());
  });
});

app.listen(PORT, function() {
  console.log("Server is running on PORT:", PORT);
});
