from deep_translator import GoogleTranslator
from pymongo import MongoClient

# MongoDB connection (assuming it's running)
client = MongoClient('mongodb://localhost:27017')
db = client['legalSaas']
translation_cache = db['translation_cache']

class TranslationService:
    def __init__(self):
        self.translator = GoogleTranslator()

    def translate(self, text, target_lang, source_lang='en'):
        # Check cache
        cache_key = f"{text}_{source_lang}_{target_lang}"
        cached = translation_cache.find_one({'key': cache_key})
        if cached:
            return cached['translation']

        # Translate
        translated = self.translator.translate(text, src=source_lang, dest=target_lang)

        # Cache
        translation_cache.insert_one({
            'key': cache_key,
            'translation': translated
        })

        return translated

# Singleton instance
translator = TranslationService()

def translate_text(text, target_lang, source_lang='en'):
    return translator.translate(text, target_lang, source_lang)