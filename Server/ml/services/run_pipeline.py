import sys
import json
from pipelineService import process_question

if __name__ == "__main__":
    question = None
    clauses = None
    lang = 'en'

    if len(sys.argv) >= 2:
        question = sys.argv[1]
        clauses_json = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] else None
        if clauses_json:
            try:
                clauses = json.loads(clauses_json)
            except Exception as e:
                print(json.dumps({"error": f"Invalid clauses JSON: {str(e)}"}))
                sys.exit(1)

        if len(sys.argv) > 3 and sys.argv[3]:
            lang = sys.argv[3]
    else:
        # Read structured input from stdin to avoid shell escaping problems
        try:
            input_data = json.load(sys.stdin)
            question = input_data.get('question')
            clauses = input_data.get('clauses')
            lang = input_data.get('lang', 'en')
        except Exception as e:
            print(json.dumps({"error": f"Invalid stdin JSON: {str(e)}"}))
            sys.exit(1)

    if not question:
        print(json.dumps({"error": "Question required"}))
        sys.exit(1)

    try:
        result = process_question(question, clauses, lang)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))