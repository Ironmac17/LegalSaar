import { useState, useContext } from "react";
import api from "../../api/api";
import VoiceRecorder from "../../components/VoiceRecorder";
import LanguageSelector from "../../components/LanguageSelector";
import { AuthContext } from "../../auth/AuthContext";

export default function Assistant() {
  const { language } = useContext(AuthContext);

  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);

  const askText = async () => {
    const res = await api.post("/questions/ask", {
      question
    });
    setResult(res.data);
  };

  const uploadDocument = async () => {
    const form = new FormData();
    form.append("file", file);
    const res = await api.post("/documents/upload", form);
    alert("Document uploaded");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <LanguageSelector />

      <h1 className="text-2xl font-bold mt-4 mb-4">
        Legal Assistant
      </h1>

      {/* TEXT QUESTION */}
      <div className="mb-6">
        <input
          className="border w-full p-3"
          placeholder="Ask your legal question..."
          value={question}
          onChange={(e)=>setQuestion(e.target.value)}
        />
        <button
          onClick={askText}
          className="mt-3 bg-blue-600 text-white px-4 py-2"
        >
          Ask
        </button>
      </div>

      {/* VOICE QUESTION */}
      <div className="mb-6">
        <VoiceRecorder language={language} onResult={setResult}/>
      </div>

      {/* DOCUMENT UPLOAD */}
      <div className="mb-6">
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <button
          onClick={uploadDocument}
          className="ml-3 bg-green-600 text-white px-4 py-2"
        >
          Upload Document
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-8 border p-4 rounded">
          <p className="mb-3">{result.explanation}</p>
          {result.audio && <audio controls src={result.audio}></audio>}
        </div>
      )}
    </div>
  );
}
