import { useRef, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";

export default function VoiceRecorder({ onResult }) {
  const { language } = useContext(AuthContext);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorderRef.current = new MediaRecorder(stream);
    chunksRef.current = [];

    recorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/wav" });
      const form = new FormData();
      form.append("audio", blob);

      const res = await api.post(`/voice/ask-voice?lang=${language}`, form);
      onResult(res.data);
    };

    recorderRef.current.start();
    setRecording(true);
  };

  const stop = () => {
    recorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div>
      {!recording ? (
        <button onClick={start} className="bg-green-600 text-white px-4 py-2">
          Start Recording
        </button>
      ) : (
        <button onClick={stop} className="bg-red-600 text-white px-4 py-2">
          Stop Recording
        </button>
      )}
    </div>
  );
}
