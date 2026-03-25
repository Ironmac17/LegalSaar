import { useState, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../auth/AuthContext";
import VoiceRecorder from "../../components/VoiceRecorder";
import ChatInput from "../../components/ChatInput";
import ChatBubble from "../../components/ChatBubble";
import { FiHelpCircle, FiSearch } from "react-icons/fi";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { t } from "../../utils/i18n";



export default function AskQuestion() {
  const { language } = useContext(AuthContext);
  const [searchType, setSearchType] = useState("text"); // text or voice
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError(t("enterQuestionError", language));
      return;
    }

    setLoading(true);
    setError("");
    try {
      // Updated for FAISS + FLAN-T5 (no prompt-based payload)
      const res = await api.post(`/questions/ask?lang=${language}`, {
        question: query,
      });
      setResult(res.data);
      if (res.data.audio) {
        const audio = new Audio(res.data.audio);
        audio.play();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceResult = (data) => {
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiHelpCircle className="w-12 h-12 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              {t("askTitle", language)}
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {t("askSubtitle", language)}
          </p>
        </div>

        {/* Search Mode Toggle */}
        <div className="flex gap-4 mb-8 justify-center">
          <Button
            variant={searchType === "text" ? "primary" : "secondary"}
            onClick={() => setSearchType("text")}
          >
            {t("textSearch", language)}
          </Button>
          <Button
            variant={searchType === "voice" ? "primary" : "secondary"}
            onClick={() => setSearchType("voice")}
          >
            {t("voiceSearch", language)}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg text-danger-700">
            {error}
          </div>
        )}

        {/* Text Search */}
        {searchType === "text" && (
          <div className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ChatInput
                onSend={(query) => {
                  setSearchQuery(query);
                  handleSearch(query);
                }}
                placeholder={t("placeholder", language)}
              />
            </div>
          </div>
        )}

        {/* Voice Search */}
        {searchType === "voice" && (
          <div className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600 mb-6">
                {t("tapMicrophone", language)}
              </p>
              <VoiceRecorder onResult={handleVoiceResult} />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader text={t("findingAnswer", language)} />
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("answer", language)}</h2>
            <ChatBubble
              role="assistant"
              text={result.explanation || t("noExplanation", language)}
            />

            {result.suggestedActions && result.suggestedActions.length > 0 && (
              <div className="mt-8 p-6 bg-success-50 border border-success-200 rounded-lg">
                <h3 className="font-bold text-success-900 mb-4">
                  Recommended Actions
                </h3>
                <ul className="list-disc list-inside space-y-2 text-success-800">
                  {result.suggestedActions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.relevantOffices && result.relevantOffices.length > 0 && (
              <div className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-lg">
                <h3 className="font-bold text-primary-900 mb-4">
                  Relevant Offices
                </h3>
                <div className="space-y-3">
                  {result.relevantOffices.map((office, i) => (
                    <div key={i} className="bg-white p-4 rounded">
                      <p className="font-semibold text-gray-900">
                        {office.name}
                      </p>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                      {office.phone && (
                        <p className="text-primary-600 text-sm">
                          {office.phone}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sample Questions */}
        {!result && !loading && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiSearch size={24} />
              {t("popularQuestions", language)}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {(t("sampleQuestions", language) || []).map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleSearch(q);
                  }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition text-left font-medium text-gray-700 hover:text-primary-600"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
