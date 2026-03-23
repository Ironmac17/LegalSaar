# Data preprocessing script
# Load legal documents, chunk them, save to chunks.json

import json

# Placeholder: Assume data is in some format
chunks = [
    {'text': 'Legal clause 1: You must pay taxes on time.'},
    {'text': 'Legal clause 2: Contracts require signatures.'},
    # Add more chunks
]

with open('/server/ml/models/chunks.json', 'w') as f:
    json.dump(chunks, f)

print("Chunks saved.")