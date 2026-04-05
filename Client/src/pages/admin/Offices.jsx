import { FiMapPin, FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
} from "../../api/adminApi";

export default function AdminOffices() {
  const { success, error } = useToast();
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingOffice, setEditingOffice] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    type: "",
    phone: "",
  });

  useEffect(() => {
    const loadOffices = async () => {
      setLoading(true);
      try {
        const res = await getOffices();
        setOffices(res.data);
      } catch (err) {
        console.error("Failed to load offices", err);
        error("Unable to fetch offices");
      } finally {
        setLoading(false);
      }
    };
    loadOffices();
  }, [error]);

  const filteredData = offices.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this office?")) return;
    try {
      await deleteOffice(id);
      setOffices(offices.filter((item) => item._id !== id));
      success("Office deleted successfully!");
    } catch (err) {
      console.error("Delete failed", err);
      error("Could not delete office");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <FiMapPin className="text-success-600" size={32} />
              Government Offices
            </h1>
            <p className="text-gray-600">Manage government office database</p>
          </div>
          <Button
            onClick={() => {
              setEditingOffice(null);
              setFormData({
                name: "",
                address: "",
                city: "",
                type: "",
                phone: "",
              });
              setShowForm(true);
            }}
            variant="success"
            size="lg"
            className="flex items-center gap-2"
          >
            <FiPlus size={20} />
            Add Office
          </Button>
        </div>

        {/* Search */}
        {loading && (
          <div className="text-center py-12">
            <Loader text="Loading offices..." />
          </div>
        )}
        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or city..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
            />
          </div>
        </div>

        {/* List */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                {editingOffice ? "Edit Office" : "Add Office"}
              </h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    if (editingOffice) {
                      const res = await updateOffice(editingOffice._id, formData);
                      setOffices(
                        offices.map((o) =>
                          o._id === editingOffice._id ? res.data : o,
                        ),
                      );
                      success("Office updated");
                    } else {
                      const res = await createOffice(formData);
                      setOffices([res.data, ...offices]);
                      success("Office added");
                    }
                    setShowForm(false);
                  } catch (err) {
                    console.error("Save failed", err);
                    error("Could not save office");
                  }
                }}
              >
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Type (e.g. Police, Court)"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <Button onClick={() => setShowForm(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" variant="success">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        {filteredData.length > 0 ? (
          <div className="grid gap-4">
            {filteredData.map((office) => (
              <div
                key={office._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-success-600"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {office.name}
                    </h3>
                    <span className="inline-block mt-2 bg-success-100 text-success-700 px-3 py-1 rounded text-sm font-semibold">
                      {office.type}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-accent-600 hover:bg-accent-50 rounded-lg transition">
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(office._id)}
                      className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{office.address}</p>
                <p className="text-gray-600 mb-2">{office.city}</p>
                {office.phone && (
                  <p className="text-primary-600 font-medium">{office.phone}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FiMapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No offices found</p>
          </div>
        )}
      </div>
    </div>
  );
}
