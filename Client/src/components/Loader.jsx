export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex gap-1">
        <div
          className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
      <span className="text-gray-600 font-medium">{text}</span>
    </div>
  );
}
