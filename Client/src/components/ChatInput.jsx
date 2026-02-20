import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function ChatInput({
  onSend,
  placeholder = "Ask your legal question...",
  disabled = false,
}) {
  const [text, setText] = useState("");

  const submit = () => {
    if (disabled || !text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <textarea
        className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        rows="2"
      />
      <button
        onClick={submit}
        disabled={disabled || !text.trim()}
        className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold"
      >
        <FiSend size={20} />
      </button>
    </div>
  );
}
