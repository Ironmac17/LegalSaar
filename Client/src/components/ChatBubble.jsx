export default function ChatBubble({ role, text, timestamp, loading = false }) {
  const isUser = role === "user";

  // display spinner or animated dots when loading
  const content = loading ? (
    <span className="inline-block animate-pulse">•••</span>
  ) : (
    text
  );

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 items-end gap-2`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary-600">
          ⚖️
        </div>
      )}
      <div
        className={`px-4 py-3 rounded-2xl max-w-md break-words ${isUser
            ? "bg-primary-600 text-white rounded-br-none shadow-md"
            : "bg-gray-100 text-gray-900 rounded-bl-none shadow-sm"
          }`}
      >
        <p className="leading-relaxed text-sm">{content}</p>
        {timestamp && !loading && (
          <p
            className={`text-xs mt-2 ${isUser ? "text-primary-100" : "text-gray-500"
              }`}
          >
            {new Date(timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-accent-600">
          👤
        </div>
      )}
    </div>
  );
}
