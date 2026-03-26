import { useState, useContext } from "react";
import api from "../../api/api";
import VoiceRecorder from "../../components/VoiceRecorder";
import ConversationMode from "../../components/ConversationMode";
import ChatWindow from "../../components/ChatWindow";
import ChatInput from "../../components/ChatInput";
import { useToast } from "../../hooks/useToast";
import { AuthContext } from "../../auth/AuthContext";
import { FiUpload, FiFileText } from "react-icons/fi";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { t } from "../../utils/i18n";

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
            text: `${t("documentUploaded", language)} ${fileToUpload.name}`,
            timestamp: new Date(),
          },
        ]);
        toast.success(t("documentUploaded", language));
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
          text: t("failedUpload", language),
          timestamp: new Date(),
        },
      ]);
      toast.error(t("failedUpload", language));
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
      toast.info(t("pleaseWaitUpload", language));
      return;
    }

    setSendingQuestion(true);
    setAwaitingResponse(true);
    setMessages((prev) => [...prev, { role: "user", text, timestamp: new Date() }]);

    try {
      // Updated for FAISS + FLAN-T5 (no prompt-based payload)
      const res = await api.post(`/questions/ask?lang=${language}`, {
        question: text,
        documentId: currentDocumentId,
      });

      const explanation =
        res.data.explanation ||
        res.data.answer ||
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
          text: t("sorryQuestionError", language) || "Sorry, I could not process your question. Please try again.",
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
              <h1 className="text-4xl font-bold text-gray-900">{t("assistantHeading", language)}</h1>
              <p className="text-gray-600 mt-2">{t("assistantSubheading", language)}</p>
            </div>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-primary-800 text-sm font-medium">
              {currentDocumentId && documentName
                ? `📄 ${t("documentUploaded", language)} ${documentName}`
                : t("readyHelp", language)}
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
                {t("clearDocument", language)}
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
                  {t("uploadLegalDocument", language)}
                </h3>

                <Button variant="outline" as="span" disabled={uploading}>
                  {file ? `${t("selectedFile", language)}: ${file.name}` : t("chooseFile", language)}
                </Button>
              </div>
            </label>
          )}

          {/* Voice Input */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">{t("askByVoice", language)}</h3>
            <VoiceRecorder onResult={handleVoiceResult} />
          </div>

          {/* Text Input */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">{t("askAQuestion", language)}</h3>
            <ChatInput
              onSend={askText}
              placeholder={t("placeholder", language)}
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
