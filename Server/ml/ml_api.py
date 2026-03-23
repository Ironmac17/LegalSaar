from flask import Flask, request, jsonify
from services.pipelineService import process_question
from services.translationService import translate_text

app = Flask(__name__)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question')
    lang = data.get('lang', 'en')

    if not question:
        return jsonify({'error': 'Question required'}), 400

    # Process question
    result = process_question(question)

    # Translate if needed
    if lang != 'en':
        result['answer'] = translate_text(result['answer'], lang)

    return jsonify(result)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text')
    target_lang = data.get('target_lang', 'en')
    source_lang = data.get('source_lang', 'en')

    if not text:
        return jsonify({'error': 'Text required'}), 400

    translated = translate_text(text, target_lang, source_lang)
    return jsonify({'translated': translated})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)