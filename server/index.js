const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const config = require("./config");
const mongoose = require('mongoose');
const multer = require('multer');
const userRoutes = require("./routes/users");
const authRoutes = require("./middleware/auth");
const todoRoutes = require("./routes/todo");
const noteRoutes = require("./routes/note");



const port = config.PORT;
const upload = multer({dest: "uploads/"});
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes); //route
app.use("/api/auth", authRoutes); //middleware
app.use("/api/todos", todoRoutes); //route
app.use("/api/notes", noteRoutes); //route
// app.use("/api/upload", uploadRoute);
// app.use("/uploads", express.static("uploads"));

app.post("/api/uplaod", upload.single("profileImage"), (req, res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})

mongoose.connect('mongodb://127.0.0.1:27017/revise').then(()=>{
    console.log("connected to mongoDB")
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
    })  
}).catch((err)=> 
    console.log("Error connecting", err))

