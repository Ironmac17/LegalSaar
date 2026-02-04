import faiss
import json
import numpy as np
from embed import Embedder
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FAISS_DIR = os.path.join(BASE_DIR, "faiss_store")

INDEX_PATH = os.path.join(FAISS_DIR, "knowledge.index")
META_PATH = os.path.join(FAISS_DIR, "knowledge_meta.json")

def main():
    embedder = Embedder()

    query = "Can I appeal a traffic fine?"
    query_vec = embedder.embed_texts([query])

    index = faiss.read_index(INDEX_PATH)

    with open(META_PATH) as f:
        ids = json.load(f)

    D, I = index.search(query_vec, k=2)

    print("Query:", query)
    print("Top matches:")
    for idx in I[0]:
        print("-", ids[idx])

if __name__ == "__main__":
    main()
