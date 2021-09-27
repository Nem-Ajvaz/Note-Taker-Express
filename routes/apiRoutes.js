const path = require("path");
const fs = require("fs");

module.exports = (app) => {
  //Retrieve information from JSON and send it to the client side for rendering.
  app.get("/api/notes", (req, res) => {
    try {
      storedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    } catch (err) {
      console.log(err);
    }

    res.json(storedNotes);
  });

  //Creating a new note
  app.post("/api/notes", function (req, res) {
    try {
      storedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
      req.body.id = storedNotes.length;
      newNotes = req.body;
      storedNotes.push(newNotes);
      storedNotes = JSON.stringify(storedNotes);

      fs.writeFile("./db/db.json", storedNotes, "utf8", function (err) {
        if (err) throw err;
      });

      res.json(JSON.parse(storedNotes));
    } catch (err) {
      throw err;
    }
  });

  // Deleting notes
  app.delete("/api/notes/:id", function (req, res) {
    try {
      let noteToDelete = req.params.id;
      console.log(noteToDelete);

      storedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

      for (let i = 0; i < storedNotes.length; i++) {
        if (storedNotes[i].id === parseInt(noteToDelete)) {
          storedNotes.splice([i], 1);
        }
      }
      newNotes = JSON.stringify(storedNotes);

      fs.writeFile("./db/db.json", newNotes, "utf8", function (err) {
        if (err) throw err;
      });

      res.send(JSON.parse(newNotes));
    } catch (err) {
      throw err;
    }
  });
};
