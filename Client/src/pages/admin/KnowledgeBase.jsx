import { useEffect, useState } from "react";
import { getKnowledge } from "../../api/adminApi";
import { useToast } from "../../hooks/useToast";
import { FiBook, FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function KnowledgeBase() {
  const { error: showError, success } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    getKnowledge()
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error loading knowledge:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ title: "", content: "", category: "" });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      showError("Please fill in all required fields");
      return;
    }
    // TODO: Implement API call to save
    console.log("Saving:", formData);
    success("Entry saved successfully!");
    setShowForm(false);
  };

  const handleDelete = (id) => {
    // TODO: Implement API call to delete
    setData(data.filter((item) => item._id !== id));
    success("Entry deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <FiBook className="text-primary-600" size={32} />
              Legal Knowledge Base
            </h1>
            <p className="text-gray-600">
              Manage legal information and knowledge entries
            </p>
          </div>
          <Button
            onClick={handleAddNew}
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
          >
            <FiPlus size={20} />
            Add Entry
          </Button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingId ? "Edit Entry" : "Add New Entry"}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Entry title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select category</option>
                      <option value="Labor Laws">Labor Laws</option>
                      <option value="Family Law">Family Law</option>
                      <option value="Criminal Law">Criminal Law</option>
                      <option value="Property Law">Property Law</option>
                      <option value="Constitutional Rights">
                        Constitutional Rights
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows="8"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Detailed legal information..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3 justify-end">
                  <Button
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save Entry
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search knowledge entries..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <Loader text="Loading knowledge base..." />
          </div>
        )}

        {/* List */}
        {!loading && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {filteredData.length} Entries
            </h2>

            {filteredData.length > 0 ? (
              <div className="space-y-4">
                {filteredData.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {item.content}
                        </p>
                        {item.category && (
                          <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded text-sm font-semibold">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-accent-600 hover:bg-accent-50 rounded-lg transition"
                        >
                          <FiEdit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
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
                <FiBook className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No knowledge entries found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
