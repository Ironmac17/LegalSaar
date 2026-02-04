import json
import os
import faiss
import numpy as np
from embed import Embedder

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FAISS_DIR = os.path.join(BASE_DIR, "faiss_store")

INDEX_PATH = os.path.join(FAISS_DIR, "knowledge.index")
META_PATH = os.path.join(FAISS_DIR, "knowledge_meta.json")

# TEMP SAMPLE DATA (will be DB-driven later)
knowledge_data = [
    {
        "id": "k1",
        "text": "Traffic fines are civil penalties and do not affect criminal records."
    },
    {
        "id": "k2",
        "text": "Building a house requires prior approval from the municipal authority."
    },
    {
        "id": "k3",
        "text": "Appeals against traffic fines must be filed within 30 days."
    }
]

def main():
    os.makedirs(FAISS_DIR, exist_ok=True)

    texts = [k["text"] for k in knowledge_data]
    ids = [k["id"] for k in knowledge_data]

    embedder = Embedder()
    vectors = embedder.embed_texts(texts)

    dim = vectors.shape[1]
    index = faiss.IndexFlatIP(dim)  # cosine similarity
    index.add(vectors)

    faiss.write_index(index, INDEX_PATH)

    with open(META_PATH, "w") as f:
        json.dump(ids, f)

    print("FAISS index built successfully")

if __name__ == "__main__":
    main()
