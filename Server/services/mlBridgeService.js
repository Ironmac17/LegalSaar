const axios = require('axios');

class MLBridgeService {
    constructor() {
        this.mlApiUrl = process.env.ML_API_URL || 'http://localhost:5001';
    }

    async askQuestion(question, lang = 'en') {
        try {
            const response = await axios.post(`${this.mlApiUrl}/ask`, {
                question,
                lang
            });
            return response.data;
        } catch (error) {
            console.error('ML API error:', error.message);
            throw new Error('ML service unavailable');
        }
    }

    async translateText(text, targetLang, sourceLang = 'en') {
        try {
            const response = await axios.post(`${this.mlApiUrl}/translate`, {
                text,
                target_lang: targetLang,
                source_lang: sourceLang
            });
            return response.data.translated;
        } catch (error) {
            console.error('ML translation error:', error.message);
            return text; // Fallback to original
        }
    }
}

module.exports = new MLBridgeService();