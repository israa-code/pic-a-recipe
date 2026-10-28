const { GoogleGenAI } = require('@google/genai');
const { GEMINI_KEY } = require('../config/env');

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

const detectIngredients = async (file) => {
    let imageUpload; 

    try {
        const fileBlob = new Blob(
            [file.buffer], 
            { type: file.mimetype }
        );

        imageUpload = await ai.files.upload({
            file: fileBlob,
            config: { mimeType: file.mimetype },
        });

        const interaction = await ai.interactions.create({
            model: 'gemini-3.8-flash',
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
        //catch @ controller-error bubbles up 
        return ingredients; 
    } finally {
        // Clean up any uploaded files 
        if (imageUpload?.name) {
            try {
                await ai.files.delete({ name: imageUpload.name });
            } catch (cleanupError) {
                console.warn('Gemini file cleanup failed:', cleanupError);
            }
        }
    }
}

module.exports = detectIngredients;