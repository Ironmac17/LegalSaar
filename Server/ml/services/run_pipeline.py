import sys
import json
from pipelineService import process_question

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Question required"}))
        sys.exit(1)

    question = sys.argv[1]
    try:
        result = process_question(question)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))