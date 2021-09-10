// require dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db")

// set up express app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// JSON formatting
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get route to get index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// get route for notes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// get notes list
app.get("/api/notes", function(req, res) {
    res.json(db);
});

// add new note to db
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    db.push(newNote);
    
    fs.writeFile("db/db.json", JSON.stringify(notes,'\t'), err => {
        if (err) throw err;
        return true;
    });
});

// get notes by id
app.get("/api/notes/:id", function(req,res) {
    res.json(notes[req.params.id]);
});
    
// set up listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});