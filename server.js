const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Directories
const HTML = path.resolve(__dirname, "public");
const db = path.resolve(__dirname, "db");
const index = path.join(HTML, "index.html");
const notes = path.join(HTML, "notes.html");
const dbj = path.join(db, "db.json");


// Site Paths
app.get("/", (req, res) => { 
    res.sendFile(index) 
});

app.get("/notes", (req, res) => { 
    res.sendFile(notes) 
});



const read = fs.readFileSync(dbj, "utf8");
const noteData = JSON.parse(read);

app.get("/api/notes", (req, res) => {
    return res.json(noteData);
});

app.post("/api/notes", (req, res) => {
    const userNote = req.body;
    noteData.push(userNote);
    let newNote = JSON.stringify(noteData);
    fs.writeFile(dbj, newNote, (err) => { if (err) { throw err } });
    res.json(newNote);
});








app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });