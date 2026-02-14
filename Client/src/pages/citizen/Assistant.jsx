import { useState, useContext } from "react";
import api from "../../api/api";
import VoiceRecorder from "../../components/VoiceRecorder";
import LanguageSelector from "../../components/LanguageSelector";
import ConversationMode from "../../components/ConversationMode";
import ChatWindow from "../../components/ChatWindow";
import ChatInput from "../../components/ChatInput";
import { AuthContext } from "../../auth/AuthContext";

export default function Assistant() {
  const { language } = useContext(AuthContext);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);

  /* ---------- TEXT QUESTION ---------- */
  const askText = async (text) => {
    if (!text.trim()) return;

    // add user bubble
    setMessages((prev) => [...prev, { role: "user", text }]);

    const res = await api.post(`/questions/ask?lang=${language}`, {
      question: text,
      documentId: currentDocumentId,
    });

    // assistant bubble
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text:
          res.data.explanation ||
          res.data.clauses?.map((c) => c.text).join("\n\n") ||
          "No explanation generated.",
      },
    ]);

    if (res.data.audio) {
      const audio = new Audio(res.data.audio);
      audio.play();
    }
  };

  /* ---------- VOICE RESULT ---------- */
  const handleVoiceResult = (data) => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: data.explanation },
    ]);

    if (data.audio) {
      const audio = new Audio(data.audio);
      audio.play();
    }
  };

  /* ---------- DOCUMENT UPLOAD ---------- */
  const uploadDocument = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await api.post("/documents/upload", form);

    setCurrentDocumentId(res.data.documentId); // IMPORTANT

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "Document uploaded successfully." },
    ]);

    setFile(null);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <LanguageSelector />

      <h1 className="text-2xl font-bold mt-4 mb-4">AI Legal Assistant</h1>

      {/* CHAT WINDOW */}
      <ChatWindow messages={messages} />

      {/* TEXT INPUT */}
      <ChatInput onSend={askText} />

      {/* VOICE INPUT */}
      <div className="mt-4">
        <VoiceRecorder language={language} onResult={handleVoiceResult} />
      </div>

      {/* CONTINUOUS CONVERSATION MODE */}
      <div className="mt-4">
        <ConversationMode />
      </div>

      {/* DOCUMENT UPLOAD */}
      <div className="mt-6">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={uploadDocument}
          className="ml-3 bg-green-600 text-white px-4 py-2"
        >
          Upload Document
        </button>
      </div>
    </div>
  );
}
