import { useState } from "react";
import { FiMic } from "react-icons/fi";

export default function VoiceToggle({ onToggle }) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled(!enabled);
    onToggle?.(!enabled);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
        enabled
          ? "bg-success-600 text-white hover:bg-success-700"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      <FiMic size={18} />
      {enabled ? "Voice On" : "Voice Off"}
    </button>
  );
}
