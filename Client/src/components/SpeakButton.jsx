import { FiVolume2 } from "react-icons/fi";
import { useToast } from "../hooks/useToast";

export default function SpeakButton({ text, language = "en" }) {
  const { error: showError } = useToast();

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      showError(
        "Speech synthesis is not supported on your browser",
        "Not Supported",
      );
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode(language);
    utterance.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const getLanguageCode = (lang) => {
    const codes = {
      en: "en-US",
      hi: "hi-IN",
      ta: "ta-IN",
      te: "te-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      mr: "mr-IN",
      gu: "gu-IN",
      bn: "bn-IN",
      pa: "pa-IN",
    };
    return codes[lang] || "en-US";
  };

  return (
    <button
      onClick={handleSpeak}
      className="flex items-center gap-2 bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-all font-semibold"
      title="Listen to this text"
    >
      <FiVolume2 size={18} />
      Listen
    </button>
  );
}
