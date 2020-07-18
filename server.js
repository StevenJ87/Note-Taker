var express = require("express");
var path = require("path");
const fs = require("fs");

//----Express app set up
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/Public'));

//----Notes array
let notes =[];

//----HTML routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/Public/notes.html"));
  });
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/Public/index.html"));
  });

//----Note editing
  app.get("/api/notes", function(req, res) {
    let notes = fs.readFileSync(path.join(__dirname, "/Public/db.json"), "utf-8");
    return res.json(notes);
  });

  app.post("/api/notes",function(req,res){
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "/Public/db.json"), "utf-8")); 
    let newNote = req.body;
    notes.push(newNote);
    let i = 1;
    notes.forEach(note=>{
        note.id = i;
        i++;
    });
    console.log(notes);
    fs.writeFile(path.join(__dirname,"/Public/db.json"), JSON.stringify(notes),function (err){
        if (err) throw err;
        res.json(true);
        return res.end();
    })
  });

  //---starting server
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });