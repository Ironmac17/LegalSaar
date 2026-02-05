import whisper
import sys
import json

model = whisper.load_model("base")

def transcribe(audio_path):
    result = model.transcribe(audio_path)
    return result["text"]

if __name__ == "__main__":
    audio_file = sys.argv[1]
    text = transcribe(audio_file)
    print(json.dumps({"text": text}))
