from semanticSearchService import semantic_search_func
from flanT5Service import generate_answer
from translationService import translate_text


def safe_translate_text(text, target_lang, source_lang='en'):
    if not text or target_lang == source_lang:
        return text

    # First attempt at direct translation
    try:
        return translate_text(text, target_lang=target_lang, source_lang=source_lang)
    except Exception:
        # Fallback to chunked translation for longer content
        sentences = text.replace('\n', ' ').split('. ')
        translated_chunks = []
        current_chunk = ''

        for sentence in sentences:
            candidate = (current_chunk + '. ' + sentence).strip() if current_chunk else sentence
            if len(candidate) > 3500:
                if current_chunk:
                    try:
                        translated_chunks.append(translate_text(current_chunk, target_lang=target_lang, source_lang=source_lang))
                    except Exception:
                        translated_chunks.append(current_chunk)
                current_chunk = sentence
            else:
                current_chunk = candidate

        if current_chunk:
            try:
                translated_chunks.append(translate_text(current_chunk, target_lang=target_lang, source_lang=source_lang))
            except Exception:
                translated_chunks.append(current_chunk)

        return '. '.join(translated_chunks)


def process_question(question, clauses=None, lang='en'):
    if clauses and question.lower().strip() == "explain":
        # For "explain", just return the document content
        explanation = "\n\n".join([chunk['text'] for chunk in clauses])
        if lang and lang != 'en':
            explanation = safe_translate_text(explanation, target_lang=lang, source_lang='en')

        return {
            'answer': explanation,
            'explanation': explanation,
            'clauses': clauses
        }
    elif clauses:
        # Use provided clauses as context
        chunks = clauses
    else:
        # Step 1: Semantic search in knowledge base
        chunks = semantic_search_func(question, top_k=3)

    # Combine top chunks into context
    context = " ".join([chunk['text'] for chunk in chunks])

    # Step 2: Generate answer
    answer = generate_answer(question, context)
    explanation = answer

    if lang and lang != 'en':
        answer_translated = safe_translate_text(answer, target_lang=lang, source_lang='en')
        explanation = answer_translated
        answer = answer_translated

    return {
        'answer': answer,
        'explanation': explanation,
        'clauses': chunks
    }