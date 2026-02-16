import { useState, useContext } from "react";
import api from "../../api/api";
import VoiceRecorder from "../../components/VoiceRecorder";
import LanguageSelector from "../../components/LanguageSelector";
import ConversationMode from "../../components/ConversationMode";
import ChatWindow from "../../components/ChatWindow";
import ChatInput from "../../components/ChatInput";
import { AuthContext } from "../../auth/AuthContext";
import { FiUpload, FiFileText } from "react-icons/fi";
import Loader from "../../components/Loader";
import Button from "../../components/Button";

export default function Assistant() {
  const { language } = useContext(AuthContext);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sendingQuestion, setSendingQuestion] = useState(false);
  const [documentName, setDocumentName] = useState(null);

  /* ---------- TEXT QUESTION ---------- */
  const askText = async (text) => {
    if (!text.trim()) return;

    setSendingQuestion(true);
    setMessages((prev) => [...prev, { role: "user", text, timestamp: new Date() }]);

    try {
      const res = await api.post(`/questions/ask?lang=${language}`, {
        question: text,
        documentId: currentDocumentId,
      });

      const explanation =
        res.data.explanation ||
        res.data.clauses?.map((c) => c.text).join("\n\n") ||
        "No explanation generated.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: explanation, timestamp: new Date() },
      ]);

      if (res.data.audio) {
        const audio = new Audio(res.data.audio);
        audio.play();
      }
    } catch (err) {
      console.error("Error asking question:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I could not process your question. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setSendingQuestion(false);
    }
  };

  /* ---------- VOICE RESULT ---------- */
  const handleVoiceResult = (data) => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: data.explanation, timestamp: new Date() },
    ]);

    if (data.audio) {
      const audio = new Audio(data.audio);
      audio.play();
    }
  };

  /* ---------- DOCUMENT UPLOAD ---------- */
  const uploadDocument = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);

      const res = await api.post("/documents/upload", form);
      setCurrentDocumentId(res.data.documentId);
      setDocumentName(file.name);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Document "${file.name}" uploaded successfully. I have extracted the clauses and analyzed them. You can now ask me questions about this document, or ask general legal questions.`,
          timestamp: new Date(),
        },
      ]);

      setFile(null);
    } catch (err) {
      console.error("Error uploading document:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Failed to upload document. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">AI Legal Assistant</h1>
              <p className="text-gray-600 mt-2">Ask legal questions and get instant answers</p>
            </div>
            <LanguageSelector />
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-primary-800 text-sm font-medium">
              {currentDocumentId && documentName
                ? `📄 Analyzing: ${documentName}`
                : "Ready to help with legal questions"}
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="mb-6">
          <ChatWindow messages={messages} />
        </div>

        {/* Input Section */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">

          {/* Document Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
            <div className="flex flex-col items-center">
              <FiUpload className="w-12 h-12 text-gray-400 mb-3" />
              <h3 className="font-semibold text-gray-700 mb-2">Upload a Legal Document</h3>

              <input
                type="file"
                id="doc-upload"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                disabled={uploading}
              />

              <label htmlFor="doc-upload" className="cursor-pointer">
                <Button variant="outline" as="span" disabled={uploading}>
                  {file ? `Selected: ${file.name}` : "Choose File"}
                </Button>
              </label>

              {file && (
                <Button onClick={uploadDocument} loading={uploading} className="mt-3">
                  <FiFileText className="mr-2" />
                  Upload Document
                </Button>
              )}
            </div>
          </div>

          {/* Extra Upload Section (kept as requested) */}
          <div className="mt-6">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button
              onClick={uploadDocument}
              className="ml-3 bg-green-600 text-white px-4 py-2"
            >
              Upload Document
            </button>
          </div>

          {/* Voice Input */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Ask by Voice</h3>
            <VoiceRecorder onResult={handleVoiceResult} />
          </div>

          {/* Text Input */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Ask a Question</h3>
            <ChatInput onSend={askText} placeholder="Type your legal question here..." />
          </div>

          {/* Conversation Mode */}
          <ConversationMode />
        </div>
      </div>
    </div>
  );
}
