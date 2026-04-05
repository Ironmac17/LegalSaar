import { useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useToast } from "../hooks/useToast";

export default function SpeakButton({ text, language = "en" }) {
  const { error: showError } = useToast();
  const utteranceRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speech when text or language changes
  useEffect(() => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, language]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      showError(
        "Speech synthesis is not supported on your browser",
        "Not Supported",
      );
      return;
    }

    // If already speaking, stop it
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode(language);
    utterance.rate = 0.9;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
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
      title={isSpeaking ? "Stop listening" : "Listen to this text"}
    >
      {isSpeaking ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
      {isSpeaking ? "Stop" : "Listen"}
    </button>
  );
}
