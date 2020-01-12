const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;
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
  pkmnNamesCollection.insertOne({ name: req.body.name });
});

app.listen(PORT, function() {
  console.log("Server is running on PORT:", PORT);
});
