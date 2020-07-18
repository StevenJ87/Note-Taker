var express = require("express");
var path = require("path");
const { fstat } = require("fs");

//----Express app set up
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//----Notes array
let notes =[];

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

  app.post("/api/notes",function(req,res){
    let newNote = req.body;
    notes.push(newNote);
    notes.forEach((note)=>{
        let i = 0;
        note.id = i;
        i++;
    });
    console.log(newNote);
    fs.writeFile(path.join(__dirname,"db.json"), JSON.stringify(notes),function (err){
        if (err) throw err;
        res.json(true);
        return res.end();
    })
  });

  //---starting server
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });