import { useState, useEffect } from "react";
import api from "../../api/api";
import { FiSearch, FiBook, FiClock } from "react-icons/fi";
import Loader from "../../components/Loader";
import ChatInput from "../../components/ChatInput";
import SpeakButton from "../../components/SpeakButton";

const CATEGORIES = [
  "Labor Laws",
  "Family Law",
  "Criminal Law",
  "Property Law",
  "Constitutional Rights",
  "Government Services",
];

export default function LegalInfo() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const combineResults = (knowledgeArr, solutionArr) => {
    const know = knowledgeArr.map((k) => ({
      ...k,
      type: "knowledge",
      content: k.explanation,
    }));
    const sol = solutionArr.map((s) => ({
      ...s,
      type: "solution",
      content: s.description,
    }));
    return [...know, ...sol];
  };

  const search = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const [kres, sres] = await Promise.all([
        api.get(`/knowledge/search?q=${encodeURIComponent(searchQuery)}`),
        api.get(`/solutions/search?q=${encodeURIComponent(searchQuery)}`),
      ]);
      setResults(combineResults(kres.data, sres.data));
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchCategory = async (category) => {
    setLoading(true);
    try {
      const [kres, sres] = await Promise.all([
        api.get(`/knowledge?category=${encodeURIComponent(category)}`),
        api.get(`/solutions/search?q=${encodeURIComponent(category)}`),
      ]);
      setResults(combineResults(kres.data, sres.data));
    } catch (err) {
      console.error("Category search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (q) => {
    setQuery(q);
    // if clicking a category button, use category endpoint for guaranteed matches
    if (CATEGORIES.includes(q)) {
      searchCategory(q);
    } else {
      search(q);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiBook className="w-12 h-12 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Legal Knowledge Base
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Search simplified explanations of Indian laws and your rights
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <ChatInput
            onSend={handleSearch}
            placeholder="Search legal topics, laws, and procedures..."
          />
        </div>

        {/* Categories */}
        {results.length === 0 && !loading && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSearch(cat)}
                  className="p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-600 hover:shadow-md transition text-left"
                >
                  <p className="font-semibold text-gray-900">{cat}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Learn about {cat.toLowerCase()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <Loader text="Searching legal database..." />
          </div>
        )}

        {/* Results */}
        {results.length > 0 && !selectedResult && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Found {results.length} result{results.length !== 1 ? "s" : ""} for
              "{query}"
            </h2>
            <div className="space-y-4">
              {results.map((result) => (
                <button
                  key={result._id}
                  onClick={() => setSelectedResult(result)}
                  className="w-full p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-600 hover:shadow-lg transition text-left"
                >
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">{result.content}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    {result.category && (
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
                        {result.category}
                      </span>
                    )}
                    {result.type && (
                      <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                        {result.type === "solution" ? "Solution" : "Knowledge"}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Result */}
        {selectedResult && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <button
              onClick={() => setSelectedResult(null)}
              className="text-primary-600 hover:text-primary-700 mb-6 font-semibold flex items-center gap-1"
            >
              ← Back to Results
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedResult.title}
            </h1>

            {selectedResult.category && (
              <div className="mb-6">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-semibold">
                  {selectedResult.category}
                </span>
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {selectedResult.content}
              </p>
            </div>

            {/* Additional Info */}
            {selectedResult.relatedInfo && (
              <div className="mt-8 p-6 bg-accent-50 border border-accent-200 rounded-lg">
                <h3 className="font-bold text-accent-900 mb-4">
                  Related Information
                </h3>
                <p className="text-accent-800">{selectedResult.relatedInfo}</p>
              </div>
            )}

            {/* Listen Button */}
            <div className="mt-8 flex justify-center">
              <SpeakButton
                text={selectedResult.title + ". " + selectedResult.content}
                language="en"
              />
            </div>
          </div>
        )}

        {/* No Results */}
        {results.length === 0 && !loading && query && (
          <div className="text-center py-12">
            <FiSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No results found for "{query}"
            </p>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
