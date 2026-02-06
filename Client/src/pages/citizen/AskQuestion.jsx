import { useState } from "react";
import VoiceRecorder from "../../components/VoiceRecorder";
import LanguageSelector from "../../components/LanguageSelector";

export default function AskQuestion() {
  const [result, setResult] = useState(null);

  return (
    <div className="p-8">
      <LanguageSelector />

      <VoiceRecorder onResult={setResult} />

      {result && (
        <div className="mt-6">
          <p>{result.explanation}</p>
          {result.audio && <audio controls src={result.audio}></audio>}
        </div>
      )}
    </div>
  );
}
