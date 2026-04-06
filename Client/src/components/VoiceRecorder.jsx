import { useState, useContext, useEffect } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";
import { useToast } from "../hooks/useToast";
import { FiMic, FiStopCircle, FiLoader } from "react-icons/fi";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceRecorder({ onResult }) {
  const { language } = useContext(AuthContext);
  const { error: showError } = useToast();
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
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
      
      rec.lang = codes[language] || "en-US";

      rec.onresult = async (event) => {
        setRecording(false);
        const transcript = event.results[0][0].transcript;
        if (!transcript) return;
        
        setLoading(true);
        try {
          // Send the transcribed text securely to the generic /ask endpoint, bypassing broken audio uploads
          const res = await api.post(`/questions/ask?lang=${language}`, { question: transcript });
          onResult(res.data);
        } catch (error) {
          console.error("Error asking voice transcript:", error);
          showError("Failed to fetch response for your audio query.", "Error");
        } finally {
          setLoading(false);
        }
      };

      rec.onerror = (event) => {
        setRecording(false);
        setLoading(false);
        if (event.error !== "aborted") {
           showError("Speech recognition failed: " + event.error, "Voice Error");
        }
      };
      
      rec.onend = () => {
         setRecording(false);
      }

      setRecognition(rec);
    }
  }, [language, onResult, showError]);

  const start = () => {
    if (!recognition) {
       showError("Speech recognition is not supported in this browser.", "Not Supported");
       return;
    }
    try {
      recognition.start();
      setRecording(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stop = () => {
    if (recognition) {
      recognition.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex gap-3 items-center justify-center">
      {!recording && !loading ? (
        <button
          onClick={start}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-success-500 to-success-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-success-700 transition-all font-bold tracking-wide transform hover:-translate-y-1 border border-success-400/50"
        >
          <FiMic size={24} />
          Tap to Speak
        </button>
      ) : recording ? (
        <button
          onClick={stop}
          className="flex items-center justify-center gap-2 bg-danger-600 text-white px-8 py-4 rounded-full shadow-lg border-4 border-danger-200 animate-pulse transition-all font-bold tracking-wide"
        >
          <FiStopCircle size={24} className="animate-spin-slow" />
          Listening... (Tap to Send)
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-full shadow-lg font-bold tracking-wide">
          <FiLoader size={24} className="animate-spin" />
          Processing Audio...
        </div>
      )}
    </div>
  );
}
