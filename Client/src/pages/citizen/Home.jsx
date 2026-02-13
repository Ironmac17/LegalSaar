import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* HERO */}
      <div className="text-center py-16 bg-blue-50">
        <h1 className="text-4xl font-bold mb-4">
          AI Legal Assistance for Everyone
        </h1>

        <p className="text-lg mb-8">
          Understand legal documents, ask questions by voice, and find nearby
          government offices in your own language.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/assistant"
            className="bg-purple-600 text-white px-6 py-3 rounded"
          >
            Open Legal Assistant
          </Link>

          <Link
            to="/ask"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Ask Question
          </Link>

          <Link
            to="/upload"
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Upload Document
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 p-10">
        <div className="border rounded p-6">
          <h3 className="text-xl font-semibold mb-2">Voice Assistant</h3>
          <p>Ask legal questions using voice in your preferred language.</p>
        </div>

        <div className="border rounded p-6">
          <h3 className="text-xl font-semibold mb-2">Document Analysis</h3>
          <p>Upload contracts and notices to understand every clause clearly.</p>
        </div>

        <div className="border rounded p-6">
          <h3 className="text-xl font-semibold mb-2">Nearby Offices</h3>
          <p>Find the correct government office and next legal steps quickly.</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center py-6 bg-gray-800 text-white mt-auto">
        © {new Date().getFullYear()} Legal Accessibility Platform
      </footer>
    </div>
  );
}
