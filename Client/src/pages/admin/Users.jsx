import { useEffect, useState } from "react";
import { getUsers } from "../../api/adminApi";
import { FiUsers, FiSearch, FiSlash, FiCheckCircle } from "react-icons/fi";
import Loader from "../../components/Loader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error loading users:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.phone.includes(searchQuery) ||
      (user.name && user.name.includes(searchQuery));
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" ? !user.blocked : user.blocked);
    return matchesSearch && matchesStatus;
  });

  const toggleBlockUser = (userId) => {
    // TODO: Implement API call
    setUsers(
      users.map((u) => (u._id === userId ? { ...u, blocked: !u.blocked } : u)),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
            <FiUsers className="text-primary-600" size={32} />
            Registered Citizens
          </h1>
          <p className="text-gray-600 mb-12">Manage user accounts and access</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-600">
            <p className="text-gray-600 text-sm mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-success-600">
            <p className="text-gray-600 text-sm mb-1">Active Users</p>
            <p className="text-3xl font-bold text-gray-900">
              {users.filter((u) => !u.blocked).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-danger-600">
            <p className="text-gray-600 text-sm mb-1">Blocked Users</p>
            <p className="text-3xl font-bold text-gray-900">
              {users.filter((u) => u.blocked).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by phone or name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Filter Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Users</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <Loader text="Loading users..." />
          </div>
        )}

        {/* List */}
        {!loading && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {filteredUsers.length} User{filteredUsers.length !== 1 ? "s" : ""}
            </h2>

            {filteredUsers.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {user.name || "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                              user.blocked
                                ? "bg-danger-100 text-danger-700"
                                : "bg-success-100 text-success-700"
                            }`}
                          >
                            {user.blocked ? (
                              <>
                                <FiSlash size={16} /> Blocked
                              </>
                            ) : (
                              <>
                                <FiCheckCircle size={16} /> Active
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => toggleBlockUser(user._id)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                              user.blocked
                                ? "bg-success-100 text-success-700 hover:bg-success-200"
                                : "bg-danger-100 text-danger-700 hover:bg-danger-200"
                            }`}
                          >
                            {user.blocked ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FiUsers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No users found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
