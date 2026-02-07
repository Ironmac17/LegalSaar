import ChatBubble from "./ChatBubble";

export default function ChatWindow({ messages }) {
  return (
    <div className="border rounded p-4 h-[400px] overflow-y-auto">
      {messages.map((msg, i) => (
        <ChatBubble key={i} role={msg.role} text={msg.text} />
      ))}
    </div>
  );
}
