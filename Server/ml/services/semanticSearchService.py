import os
import torch
import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# Disable parallelism and threading to avoid macOS mutex issues
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"
os.environ["NUMEXPR_NUM_THREADS"] = "1"
os.environ["OPENBLAS_NUM_THREADS"] = "1"
torch.set_num_threads(1)

class SemanticSearchService:
    def __init__(self):
        # Load MiniLM model on CPU
        self.encoder = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2', device='cpu')

        # Load FAISS index
        self.index = faiss.read_index('../models/faiss.index')

        # Load chunks
        with open('../models/chunks.json', 'r') as f:
            self.chunks = json.load(f)

    def search(self, query, top_k=3):
        # Encode query
        query_embedding = self.encoder.encode([query])[0]

        # Search FAISS
        distances, indices = self.index.search(np.array([query_embedding]), top_k)

        # Return top chunks
        results = []
        for i, idx in enumerate(indices[0]):
            if idx != -1:  # Valid index
                results.append({
                    'text': self.chunks[idx]['text'],
                    'score': float(distances[0][i])
                })

        return results

# Singleton instance
semantic_search = SemanticSearchService()

def semantic_search_func(query, top_k=3):
    return semantic_search.search(query, top_k)