import { FiTarget, FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function Solutions() {
  const { success } = useToast();
  const [solutions, setSolutions] = useState([
    {
      _id: "1",
      title: "How to file a labor complaint",
      steps: ["Visit nearest labor office", "File complaint form", "Follow up"],
      category: "Labor",
    },
    {
      _id: "2",
      title: "Tenant rights protection",
      steps: ["Document the issue", "Send notice", "File case if needed"],
      category: "Property",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    steps: "",
    category: "",
  });

  const filteredData = solutions.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id) => {
    setSolutions(solutions.filter((item) => item._id !== id));
    success("Solution deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <FiTarget className="text-accent-600" size={32} />
              Legal Solutions
            </h1>
            <p className="text-gray-600">
              Manage solution templates and action steps
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingId(null);
              setFormData({ title: "", steps: "", category: "" });
              setShowForm(true);
            }}
            variant="accent"
            size="lg"
            className="flex items-center gap-2"
          >
            <FiPlus size={20} />
            Add Solution
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search solutions..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>

        {/* List */}
        {filteredData.length > 0 ? (
          <div className="space-y-4">
            {filteredData.map((solution) => (
              <div
                key={solution._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {solution.title}
                    </h3>
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Steps:
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-gray-600">
                        {(solution.steps || []).map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    {solution.category && (
                      <span className="inline-block bg-accent-100 text-accent-700 px-3 py-1 rounded text-sm font-semibold">
                        {solution.category}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="p-2 text-accent-600 hover:bg-accent-50 rounded-lg transition">
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(solution._id)}
                      className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FiTarget className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No solutions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
