import { useState, useContext } from "react";
import useVoiceConversation from "../utils/useVoiceConversation";
import { AuthContext } from "../auth/AuthContext";

export default function ConversationMode() {
  const { language } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const { startConversation, stopConversation, listening } =
    useVoiceConversation(language);

  const handleResponse = (data) => {
    setMessages((prev) => [...prev, data]);

    if (data.audio) {
      const audio = new Audio(data.audio);
      audio.play();
    }
  };

  return (
    <div className="mt-6">
      {!listening ? (
        <button
          onClick={() => startConversation(handleResponse)}
          className="bg-green-600 text-white px-4 py-2"
        >
          Start Conversation
        </button>
      ) : (
        <button
          onClick={stopConversation}
          className="bg-red-600 text-white px-4 py-2"
        >
          Stop Conversation
        </button>
      )}

      <div className="mt-6">
        {messages.map((m, i) => (
          <div key={i} className="border p-3 mb-2">
            {m.explanation}
          </div>
        ))}
      </div>
    </div>
  );
}
