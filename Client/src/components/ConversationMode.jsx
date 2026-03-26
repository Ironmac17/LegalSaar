import { useState, useContext } from "react";
import useVoiceConversation from "../utils/useVoiceConversation";
import { AuthContext } from "../auth/AuthContext";
import { FiMic, FiStopCircle } from "react-icons/fi";
import ChatBubble from "./ChatBubble";
import { t } from "../utils/i18n";

export default function ConversationMode() {
  const { language } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const { startConversation, stopConversation, listening } =
    useVoiceConversation(language);

  const handleResponse = (data) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: data.explanation,
        timestamp: new Date(),
      },
    ]);

    if (data.audio) {
      const audio = new Audio(data.audio);
      audio.play();
    }
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4 text-accent-900">
        {t("continuousConversationMode", language)}
      </h3>

      <div className="flex gap-3 items-center mb-6">
        {!listening ? (
          <button
            onClick={() => startConversation(handleResponse)}
            className="flex items-center gap-2 bg-accent-600 text-white px-6 py-3 rounded-lg hover:bg-accent-700 transition-all font-semibold"
          >
            <FiMic size={20} />
            {t("startConversation", language)}
          </button>
        ) : (
          <button
            onClick={stopConversation}
            className="flex items-center gap-2 bg-danger-600 text-white px-6 py-3 rounded-lg hover:bg-danger-700 transition-all font-semibold animate-pulse"
          >
            <FiStopCircle size={20} />
            {t("stopConversation", language)}
          </button>
        )}
        {listening && (
          <span className="text-sm text-accent-700 font-medium">
            {t("listening", language)}
          </span>
        )}
      </div>

      {messages.length > 0 && (
        <div className="border border-accent-200 rounded-lg p-4 bg-white max-h-64 overflow-y-auto">
          {messages.map((m, i) => (
            <ChatBubble
              key={i}
              role={m.role}
              text={m.text}
              timestamp={m.timestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
}
