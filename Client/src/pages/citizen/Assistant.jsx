import { useState, useContext } from "react";
import api from "../../api/api";
import VoiceRecorder from "../../components/VoiceRecorder";
import LanguageSelector from "../../components/LanguageSelector";
import ConversationMode from "../../components/ConversationMode";
import ChatWindow from "../../components/ChatWindow";
import ChatInput from "../../components/ChatInput";
import { useToast } from "../../hooks/useToast";
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
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const toast = useToast();

  // helper that uploads a file and updates state
  const uploadDocument = async (selectedFile) => {
    const fileToUpload = selectedFile || file;
    if (!fileToUpload) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", fileToUpload);

      const res = await api.post("/documents/upload", form);
      if (res.data && res.data.documentId) {
        setCurrentDocumentId(res.data.documentId);
        setDocumentName(fileToUpload.name);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `Document \"${fileToUpload.name}\" uploaded successfully. I have extracted the clauses and analyzed them. You can now ask me questions about this document, or ask general legal questions.`,
            timestamp: new Date(),
          },
        ]);
        toast.success("Document uploaded successfully");
        setFile(null);
      } else {
        throw new Error("Invalid upload response");
      }
    } catch (err) {
      // upload error
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Failed to upload document. Please try again.",
          timestamp: new Date(),
        },
      ]);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      uploadDocument(selected);
    }
  };

  /* ---------- TEXT QUESTION ---------- */
  const askText = async (text) => {
    if (!text.trim()) return;

    if (uploading) {
      toast.info("Please wait for the document to finish uploading before asking.");
      return;
    }

    setSendingQuestion(true);
    setAwaitingResponse(true);
    setMessages((prev) => [...prev, { role: "user", text, timestamp: new Date() }]);

    try {
      // Updated for FAISS + FLAN-T5 (no prompt-based payload)
      const res = await api.post(`/questions/ask?lang=${language}`, {
        question: text,
      });

      const explanation =
        res.data.explanation ||
        res.data.clauses?.map((c) => c.text).join("\n\n") ||
        "No explanation generated.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: explanation, timestamp: new Date() },
      ]);

      if (res.data.aiError) {
        toast.warning(
          "AI service currently unavailable: " +
          (res.data.aiErrorMessage ||
            "Please check your OpenAI API key, quota, or billing plan."),
          "AI error"
        );
      }

      if (res.data.audio) {
        const audio = new Audio(res.data.audio);
        audio.play();
      }
    } catch (err) {
      // question error
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
      setAwaitingResponse(false);
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

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-primary-800 text-sm font-medium">
              {currentDocumentId && documentName
                ? `📄 Document: ${documentName}`
                : "Ready to help with legal questions"}
            </p>
            {currentDocumentId && (
              <button
                onClick={() => {
                  setCurrentDocumentId(null);
                  setDocumentName(null);
                  setMessages([]);
                }}
                className="text-sm text-danger-600 hover:underline"
              >
                Clear document
              </button>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="mb-6">
          <ChatWindow messages={messages} loading={awaitingResponse} />
        </div>

        {/* Input Section */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">

          {/* Document Upload - hidden once a document has been processed */}
          {!currentDocumentId && (
            <label
              htmlFor="doc-upload"
              className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition"
            >
              <input
                type="file"
                id="doc-upload"
                accept=".pdf,.png,.jpg,.jpeg,.txt"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
              <div className="flex flex-col items-center">
                <FiUpload className="w-12 h-12 text-gray-400 mb-3" />
                <h3 className="font-semibold text-gray-700 mb-2">
                  Upload a Legal Document
                </h3>

                <Button variant="outline" as="span" disabled={uploading}>
                  {file ? `Selected: ${file.name}` : "Choose File"}
                </Button>
              </div>
            </label>
          )}

          {/* Voice Input */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Ask by Voice</h3>
            <VoiceRecorder onResult={handleVoiceResult} />
          </div>

          {/* Text Input */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Ask a Question</h3>
            <ChatInput
              onSend={askText}
              placeholder="Type your legal question here..."
              disabled={uploading || sendingQuestion || awaitingResponse}
            />
          </div>

          {/* Conversation Mode */}
          <ConversationMode />
        </div>
      </div>
    </div>
  );
}
