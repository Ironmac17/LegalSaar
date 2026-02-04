import json
import os
import faiss
from embed import Embedder

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FAISS_DIR = os.path.join(BASE_DIR, "faiss_store")
INDEX_PATH = os.path.join(FAISS_DIR, "knowledge.index")
META_PATH = os.path.join(FAISS_DIR, "knowledge_meta.json")
DATA_PATH = os.path.join(BASE_DIR, "knowledge_dump.json")

def main():
    os.makedirs(FAISS_DIR, exist_ok=True)

    with open(DATA_PATH) as f:
        knowledge_data = json.load(f)

    texts = [k["text"] for k in knowledge_data]
    ids = [k["_id"] for k in knowledge_data]   # ✅ Mongo ObjectIds

    embedder = Embedder()
    vectors = embedder.embed_texts(texts)

    dim = vectors.shape[1]
    index = faiss.IndexFlatIP(dim)
    index.add(vectors)

    faiss.write_index(index, INDEX_PATH)

    with open(META_PATH, "w") as f:
        json.dump(ids, f)

    print("FAISS index built with MongoDB IDs")

if __name__ == "__main__":
    main()
