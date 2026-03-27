import { useEffect, useRef } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useToast } from "../hooks/useToast";

export default function SpeakButton({ text, language = "en" }) {
  const { error: showError } = useToast();
  const utteranceRef = useRef(null);
  const isSpeakingRef = useRef(false);

  // Stop speech when text or language changes
  useEffect(() => {
    if (window.speechSynthesis && isSpeakingRef.current) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
    }
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
    if (isSpeakingRef.current) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode(language);
    utterance.rate = 0.9;

    utterance.onstart = () => {
      isSpeakingRef.current = true;
    };

    utterance.onend = () => {
      isSpeakingRef.current = false;
    };

    utterance.onerror = () => {
      isSpeakingRef.current = false;
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
      title={isSpeakingRef.current ? "Stop listening" : "Listen to this text"}
    >
      {isSpeakingRef.current ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
      {isSpeakingRef.current ? "Stop" : "Listen"}
    </button>
  );
}
