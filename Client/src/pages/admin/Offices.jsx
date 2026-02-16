import { FiMapPin, FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function AdminOffices() {
  const { success } = useToast();
  const [offices, setOffices] = useState([
    {
      _id: "1",
      name: "District Police Office",
      address: "Main Street, City Center",
      city: "Mumbai",
      type: "Police",
      phone: "022-12345678",
    },
    {
      _id: "2",
      name: "District Court",
      address: "Court Road, Judicial Complex",
      city: "Delhi",
      type: "Court",
      phone: "011-87654321",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    type: "",
    phone: "",
  });

  const filteredData = offices.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id) => {
    setOffices(offices.filter((item) => item._id !== id));
    success("Office deleted successfully!");
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
