import { useEffect, useState } from "react";
import api from "../../api/api";
import { FiMapPin, FiPhone, FiClock, FiFilter } from "react-icons/fi";
import Loader from "../../components/Loader";

const OFFICE_TYPES = [
  "Police",
  "Court",
  "District Administration",
  "Revenue Office",
  "Labour Department",
  "Health",
];

export default function Offices() {
  const [offices, setOffices] = useState([]);
  const [filteredOffices, setFilteredOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [searchCity, setSearchCity] = useState("");

  const applyFilters = (data, type, city) => {
    let filtered = data;

    if (type !== "All") {
      filtered = filtered.filter((o) => o.department === type);
    }

    if (city) {
      filtered = filtered.filter((o) =>
        o.city.toLowerCase().includes(city.toLowerCase()),
      );
    }

    setFilteredOffices(filtered);
  };

  useEffect(() => {
    api
      .get("/offices")
      .then((res) => {
        setOffices(res.data);
        applyFilters(res.data, "All", "");
      })
      .catch((err) => console.error("Error fetching offices:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    applyFilters(offices, type, searchCity);
  };

  const handleCitySearch = (city) => {
    setSearchCity(city);
    applyFilters(offices, selectedType, city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiMapPin className="w-12 h-12 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Find Government Offices
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Locate the right government office for your legal needs
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            {/* City Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search by City
              </label>
              <input
                type="text"
                value={searchCity}
                onChange={(e) => handleCitySearch(e.target.value)}
                placeholder="Enter city name..."
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FiFilter size={16} />
                Filter by Type
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTypeFilter("All")}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedType === "All"
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All Offices
                </button>
                {OFFICE_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeFilter(type)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedType === type
                        ? "bg-primary-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <Loader text="Loading offices..." />
          </div>
        )}

        {/* Offices List */}
        {!loading && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {filteredOffices.length} Office
              {filteredOffices.length !== 1 ? "s" : ""}
              {selectedType !== "All" && ` - ${selectedType}`}
            </h2>

            {filteredOffices.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                {filteredOffices.map((office) => (
                  <div
                    key={office._id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-primary-600"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {office.name}
                        </h3>
                        <span className="inline-block mt-2 bg-primary-100 text-primary-700 px-3 py-1 rounded text-sm font-semibold">
                          {office.department || "Government Office"}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <FiMapPin
                          className="text-primary-600 flex-shrink-0 mt-1"
                          size={20}
                        />
                        <div>
                          <p className="text-gray-600 text-sm">Address</p>
                          <p className="text-gray-900 font-medium">
                            {office.address}
                          </p>
                          <p className="text-gray-600 text-sm">{office.city}</p>
                        </div>
                      </div>

                      {/* Phone */}
                      {office.contactNumber && (
                        <div className="flex items-start gap-3">
                          <FiPhone
                            className="text-success-600 flex-shrink-0 mt-1"
                            size={20}
                          />
                          <div>
                            <p className="text-gray-600 text-sm">Contact</p>
                            <a
                              href={`tel:${office.contactNumber}`}
                              className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                              {office.contactNumber}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Timing */}
                      {office.workingHours && (
                        <div className="flex items-start gap-3">
                          <FiClock
                            className="text-warning-600 flex-shrink-0 mt-1"
                            size={20}
                          />
                          <div>
                            <p className="text-gray-600 text-sm">
                              Working Hours
                            </p>
                            <p className="text-gray-900 font-medium">
                              {office.workingHours}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(office.address + ", " + office.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-semibold"
                      >
                        View on Map
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <FiMapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 text-lg">
                    No offices found matching your criteria
                  </p>
                  <button
                    onClick={() => {
                      handleTypeFilter("All");
                      handleCitySearch("");
                    }}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Clear Filters
                  </button>
                </div>

                <div className="bg-danger-50 border border-danger-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-danger-900 mb-4 flex items-center gap-2">
                    <FiPhone className="text-danger-600" />
                    Important National Emergency Contacts
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm border border-danger-100 flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Police</span>
                      <a href="tel:100" className="bg-danger-600 text-white px-3 py-1 rounded font-bold hover:bg-danger-700">100</a>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm border border-danger-100 flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Women Helpline</span>
                      <a href="tel:1091" className="bg-danger-600 text-white px-3 py-1 rounded font-bold hover:bg-danger-700">1091</a>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm border border-danger-100 flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Legal Aid Service</span>
                      <a href="tel:15100" className="bg-danger-600 text-white px-3 py-1 rounded font-bold hover:bg-danger-700">15100</a>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm border border-danger-100 flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Child Helpline</span>
                      <a href="tel:1098" className="bg-danger-600 text-white px-3 py-1 rounded font-bold hover:bg-danger-700">1098</a>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm border border-danger-100 flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Ambulance</span>
                      <a href="tel:108" className="bg-danger-600 text-white px-3 py-1 rounded font-bold hover:bg-danger-700">108</a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
