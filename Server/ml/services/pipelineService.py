from semanticSearchService import semantic_search_func
from flanT5Service import generate_answer
from translationService import translate_text

def process_question(question, clauses=None, lang='en'):
    if clauses and question.lower().strip() == "explain":
        # For "explain", just return the document content
        explanation = "\n\n".join([chunk['text'] for chunk in clauses])
        if lang and lang != 'en':
            try:
                explanation = translate_text(explanation, target_lang=lang, source_lang='en')
            except Exception:
                pass

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
        try:
            explanation = translate_text(answer, target_lang=lang, source_lang='en')
        except Exception:
            explanation = answer

    return {
        'answer': answer,
        'explanation': explanation,
        'clauses': chunks
    }