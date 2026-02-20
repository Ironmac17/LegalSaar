import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

export default function ChatWindow({ messages, loading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="border border-gray-200 rounded-lg p-4 h-[500px] overflow-y-auto bg-white shadow-sm">
      {messages.length === 0 && !loading ? (
        <div className="h-full flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-3">⚖️</div>
            <p className="font-medium">No messages yet</p>
            <p className="text-sm">
              Start by asking a legal question or uploading a document
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              role={msg.role}
              text={msg.text}
              timestamp={msg.timestamp}
            />
          ))}
          {loading && (
            <ChatBubble role="assistant" loading={true} />
          )}
          <div ref={endRef} />
        </>
      )}
    </div>
  );
}
