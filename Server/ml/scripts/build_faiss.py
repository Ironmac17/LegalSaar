import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

def build_faiss_index():
    # Load chunks
    with open('../models/chunks.json', 'r') as f:
        chunks = json.load(f)

    # Initialize encoder
    encoder = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    # Generate embeddings
    texts = [chunk['text'] for chunk in chunks]
    embeddings = encoder.encode(texts)

    # Build FAISS index
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatIP(dimension)  # Inner product for cosine similarity
    index.add(np.array(embeddings))

    # Save index
    faiss.write_index(index, '../models/faiss.index')

    print(f"FAISS index built with {len(chunks)} chunks.")

if __name__ == "__main__":
    build_faiss_index()