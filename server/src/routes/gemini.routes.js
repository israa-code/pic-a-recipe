const express = require('express');
const upload = require('../middleware/upload');
const geminiController = require('../controllers/gemini.controller');

const router = express.Router();

router.post('/gemini', upload.single('image'), geminiController);

module.exports = router;