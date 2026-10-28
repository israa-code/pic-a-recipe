const geminiService = require('../services/gemini.service');

const scanIngredients = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'An image file is required.' });
    }
    try {
        const ingredients = await geminiService(req.file);
        return res.json(ingredients);
    } catch(error) {
        console.error('Gemini error:', error);
        return res.status(502).json({ error: 'Ingredient detection failed.' });
    }
}

module.exports = scanIngredients;