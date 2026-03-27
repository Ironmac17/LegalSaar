const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Translate text using OpenAI
router.post("/", async (req, res, next) => {
    try {
        const { text, targetLanguage, sourceLanguage = "en" } = req.body;

        if (!text || !targetLanguage) {
            return res.status(400).json({ message: "Text and targetLanguage are required" });
        }

        if (targetLanguage === sourceLanguage) {
            return res.json({ translatedText: text });
        }

        // For now, return the original text with a note about translation service
        // This can be enhanced with a different translation service or static translations
        console.log(`Translation requested: ${text} to ${targetLanguage}`);

        res.json({
            translatedText: text,
            note: "Translation service temporarily unavailable. Showing original text."
        });
    } catch (error) {
        console.error("Translation error:", error);
        res.json({
            translatedText: req.body.text || "",
            note: "Translation failed, showing original text"
        });
    }
});

module.exports = router;