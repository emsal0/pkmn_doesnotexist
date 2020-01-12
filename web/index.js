const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  // res.sendfile(__dirname + "/index.html");
  // res.status(200).send('Hello world');
});

app.listen(PORT, function() {
  console.log("Server is running on PORT:", PORT);
});
