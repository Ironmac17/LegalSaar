from semanticSearchService import semantic_search_func
from flanT5Service import generate_answer

def process_question(question, clauses=None):
    if clauses and question.lower().strip() == "explain":
        # For "explain", just return the document content
        explanation = "\n\n".join([chunk['text'] for chunk in clauses])
        return {
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

    return {
        'answer': answer,
        'explanation': answer,
        'clauses': chunks
    }