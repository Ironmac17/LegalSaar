import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Citizen Legal Assistant</h1>

      <Link to="/ask" className="block mb-3">
        Ask Question
      </Link>
      <Link to="/upload">Upload Document</Link>
      <Link
        to="/assistant"
        className="bg-purple-600 text-white px-6 py-3 rounded"
      >
        Open Legal Assistant
      </Link>
    </div>
  );
}
