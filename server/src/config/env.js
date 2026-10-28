require('dotenv').config(); 

const PORT = process.env.PORT;
const GEMINI_KEY = process.env.GEMINI_KEY;

if (!GEMINI_KEY) {
    throw new Error('GEMINI_KEY is not set');
}

module.exports = {PORT, GEMINI_KEY}; 
