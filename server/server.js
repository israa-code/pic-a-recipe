// SERVER SETUP AND CONFIGURATION
require('dotenv').config(); 
const { GoogleGenAI } = require('@google/genai');

const express = require('express');
const cors = require('cors');
const multer = require('multer');

// SECURITY: Improve File Validation 
// FILE UPLOAD VALIDATION
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const error = new Error(`${file.mimetype} is not allowed. Allowed types are JPEG, PNG, WebP, HEIC, and HEIF.`);
        error.statusCode = 400;
        cb(error);
    }
};

// MULTER FILE UPLOAD CONFIGURATION
const upload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: {
    fileSize: 10 * 1024 * 1024 // 10 MiB
    }
 });

// EXPRESS APP INITIALIZATION
const app = express(); 

const PORT = process.env.PORT;
const GEMINI_KEY = process.env.GEMINI_KEY; 

// GOOGLE GENAI CLIENT INITIALIZATION
if (!GEMINI_KEY) {
    throw new Error('GEMINI_KEY is not set');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

const ingredientsSchema = {
    type: 'object',
    properties: {
        ingredients: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of food ingredients detected in the image'
        }
    },
    required: ['ingredients']
};

// MIDDLEWARE CONFIGURATION 
app.use(express.json());
app.use(cors());

// IMAGE UPLOAD AND GEMINI INTERACTION ENDPOINT
app.post('/gemini', upload.single('image'), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'An image file is required.' });
    }

    let imageUpload; 

    try {
        const fileBlob = new Blob(
            [req.file.buffer], 
            { type: req.file.mimetype }
        );

        imageUpload = await ai.files.upload({
            file: fileBlob,
            config: { mimeType: req.file.mimetype },
        });

        const interaction = await ai.interactions.create({
            model: 'gemini-3.5-flash',
            generation_config: {
                thinking_level: 'low'
            },
            input: [
                {
                    type: 'text',
                    text: 'List only the food ingredients you can see in this image.'
                },
                {
                    type: 'image', 
                    uri: imageUpload.uri,
                    mime_type: imageUpload.mimeType 
                 }  
            ],
            response_format: {
              type: 'text',
              mime_type: 'application/json',
              schema: ingredientsSchema
            }
        });
        const ingredients = JSON.parse(interaction.output_text);

        return res.json(ingredients);

    } catch(error) {
        console.error('Gemini error:', error);
        return res.status(502).json({ error: 'Ingredient detection failed.' });
    } finally {
        // Clean up any uploaded files to avoid unnecessary storage usage
        if (imageUpload?.name) {
            try {
                await ai.files.delete({ name: imageUpload.name });
            } catch (cleanupError) {
                console.warn('Gemini file cleanup failed:', cleanupError);
            }
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running`);
});