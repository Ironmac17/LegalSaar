from semanticSearchService import semantic_search_func
from flanT5Service import generate_answer

def process_question(question):
    # Step 1: Semantic search
    chunks = semantic_search_func(question, top_k=3)

    # Combine top chunks into context
    context = " ".join([chunk['text'] for chunk in chunks])

    # Step 2: Generate answer
    answer = generate_answer(question, context)

    return {
        'answer': answer,
        'context_chunks': chunks
    }