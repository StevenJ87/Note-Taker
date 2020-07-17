var express = require("express");
var path = require("path");

//----Express app set up
var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//----HTML routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db.json"));
  });

  app.get("/api/notes", function(req, res) {
    res.json(tableData);
  });

  //---starting server
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });