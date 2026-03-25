import sys
import json
from pipelineService import process_question

if __name__ == "__main__":
    question = None
    clauses = None

    if len(sys.argv) >= 2:
        question = sys.argv[1]
        clauses_json = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] else None
        if clauses_json:
            try:
                clauses = json.loads(clauses_json)
            except Exception as e:
                print(json.dumps({"error": f"Invalid clauses JSON: {str(e)}"}))
                sys.exit(1)
    else:
        # Read structured input from stdin to avoid shell escaping problems
        try:
            input_data = json.load(sys.stdin)
            question = input_data.get('question')
            clauses = input_data.get('clauses')
        except Exception as e:
            print(json.dumps({"error": f"Invalid stdin JSON: {str(e)}"}))
            sys.exit(1)

    if not question:
        print(json.dumps({"error": "Question required"}))
        sys.exit(1)

    try:
        result = process_question(question, clauses)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))