export default function ChatBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-lg ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
