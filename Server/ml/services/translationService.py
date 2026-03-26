from deep_translator import GoogleTranslator
from pymongo import MongoClient

# MongoDB connection (assuming it's running)
client = MongoClient('mongodb://localhost:27017')
db = client['legalSaas']
translation_cache = db['translation_cache']

class TranslationService:
    def translate(self, text, target_lang, source_lang='en'):
        # Check cache
        cache_key = f"{text}_{source_lang}_{target_lang}"
        cached = translation_cache.find_one({'key': cache_key})
        if cached and cached.get('translation') and cached['translation'] != text:
            return cached['translation']

        # Translate using explicit source/target
        translator = GoogleTranslator(source=source_lang, target=target_lang)
        translated = translator.translate(text)

        # Cache (replace old or insert new)
        translation_cache.update_one(
            {'key': cache_key},
            {'$set': {'translation': translated}},
            upsert=True
        )

        return translated

# Singleton instance
translator = TranslationService()

def translate_text(text, target_lang, source_lang='en'):
    return translator.translate(text, target_lang, source_lang)