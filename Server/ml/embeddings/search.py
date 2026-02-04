import sys
import json
import os
import faiss
from embed import Embedder

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FAISS_DIR = os.path.join(BASE_DIR, "faiss_store")
INDEX_PATH = os.path.join(FAISS_DIR, "knowledge.index")
META_PATH = os.path.join(FAISS_DIR, "knowledge_meta.json")

def search(query, k=5):
    embedder = Embedder()
    query_vec = embedder.embed_texts([query])

    index = faiss.read_index(INDEX_PATH)

    with open(META_PATH) as f:
        ids = json.load(f)

    D, I = index.search(query_vec, k)

    results = [ids[i] for i in I[0]]
    return results

if __name__ == "__main__":
    query = sys.argv[1]
    results = search(query)
    print(json.dumps(results))
