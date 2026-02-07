import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2 mt-3">
      <input
        className="border p-2 flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask your legal question..."
      />
      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Send
      </button>
    </div>
  );
}
