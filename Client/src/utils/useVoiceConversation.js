import { useRef, useState } from "react";
import api from "../api/api";

export default function useVoiceConversation(language) {
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [listening, setListening] = useState(false);

  const startConversation = async (onResponse) => {
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
      onResponse(res.data);

      // autoplay next listening cycle
      if (listening) {
        startConversation(onResponse);
      }
    };

    recorderRef.current.start();

    // stop automatically after silence window (5s)
    setTimeout(() => {
      recorderRef.current.stop();
    }, 5000);

    setListening(true);
  };

  const stopConversation = () => {
    setListening(false);
    recorderRef.current?.stop();
  };

  return { startConversation, stopConversation, listening };
}
