const multer = require('multer');
const router = require("express").Router();
const Files = require('../models/syllabus');
const authTodo = require('../middleware/todo');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authTodo, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const newFile = new Files({
      originalname: req.file.originalname,
      filename: req.file.filename || req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer,
      userId: req.user._id
    });

    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

router.get('/', authTodo, async (req, res) => {
    const files = await Files.find({ userId: req.user._id }).select('_id originalname filename').sort({ createdAt: -1 });
    res.json(files);
});

router.get('/:id', async (req, res) => {
  try {
    const file = await Files.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.setHeader('Content-Type', file.mimetype || 'application/octet-stream');

    if (file.mimetype === 'application/pdf') {
      // Open PDF in browser
      res.setHeader(
        'Content-Disposition',
        `inline; filename="${encodeURIComponent(file.originalname)}"`
      );
    } else {
      // Download other files
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${encodeURIComponent(file.originalname)}"`
      );
    }

    res.send(file.data);
  } catch (err) {
    console.error("Error downloading file:", err);
    res.status(500).json({ message: 'Error downloading file' });
  }
});



module.exports = router;
