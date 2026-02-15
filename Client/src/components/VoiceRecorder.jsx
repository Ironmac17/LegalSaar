import { useRef, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";
import { FiMic, FiStopCircle, FiLoader } from "react-icons/fi";

export default function VoiceRecorder({ onResult }) {
  const { language } = useContext(AuthContext);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      recorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorderRef.current.onstop = async () => {
        setLoading(true);
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        const form = new FormData();
        form.append("audio", blob);

        try {
          const res = await api.post(`/voice/ask-voice?lang=${language}`, form);
          onResult(res.data);
        } catch (error) {
          console.error("Error sending voice:", error);
        } finally {
          setLoading(false);
        }
      };

      recorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Microphone access denied:", error);
      alert("Please enable microphone access");
    }
  };

  const stop = () => {
    recorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="flex gap-3 items-center">
      {!recording && !loading ? (
        <button
          onClick={start}
          className="flex items-center gap-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 transition-all font-semibold"
        >
          <FiMic size={20} />
          Start Recording
        </button>
      ) : recording ? (
        <button
          onClick={stop}
          className="flex items-center gap-2 bg-danger-600 text-white px-6 py-3 rounded-lg hover:bg-danger-700 transition-all font-semibold animate-pulse"
        >
          <FiStopCircle size={20} />
          Stop Recording
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold">
          <FiLoader size={20} className="animate-spin" />
          Processing...
        </div>
      )}
    </div>
  );
}
