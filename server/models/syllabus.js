// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalname: String,
  filename: String,
  mimetype: String,
  size: Number,
  data: Buffer,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userData', required:true }
}, { timestamps: true });

module.exports = mongoose.model("Files", fileSchema);