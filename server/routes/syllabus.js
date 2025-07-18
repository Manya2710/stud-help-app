const router=require('express').Router();
const mongoose=require('mongoose');
const multer=require('multer');
const authTodo = require("../middleware/todo");


// Upload Route
    app.post("/api/upload", upload.single("file"), (req, res) => {
      res.json({ file: req.file });
    });

    // Get file by filename
    app.get("/api/file/:filename", (req, res) => {
      gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
          return res.status(404).json({ err: "No file exists" });
        }

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      });
    });