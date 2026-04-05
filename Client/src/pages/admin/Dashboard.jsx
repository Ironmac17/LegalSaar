import { useState } from "react";
import {
  FiUsers,
  FiBook,
  FiMapPin,
  FiTarget,
  FiBarChart2,
} from "react-icons/fi";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: IconComponent, title, value, color, link }) => (
  <Link
    to={link}
    className={`p-6 bg-white rounded-lg shadow-md border-l-4 hover:shadow-lg transition cursor-pointer ${color}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <IconComponent size={40} className="opacity-20" />
    </div>
  </Link>
);

export default function Dashboard() {
  const [stats] = useState({
    totalUsers: 1205,
    knowledgeEntries: 342,
    offices: 156,
    solutions: 89,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Platform overview and analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={FiUsers}
            title="Total Users"
            value={stats.totalUsers}
            color="border-primary-600"
            link="/admin/users"
          />
          <StatCard
            icon={FiBook}
            title="Knowledge Entries"
            value={stats.knowledgeEntries}
            color="border-accent-600"
            link="/admin/knowledge"
          />
          <StatCard
            icon={FiTarget}
            title="Solutions"
            value={stats.solutions}
            color="border-success-600"
            link="/admin/solutions"
          />
          <StatCard
            icon={FiMapPin}
            title="Government Offices"
            value={stats.offices}
            color="border-warning-600"
            link="/admin/offices"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiUsers size={24} className="text-primary-600" />
              Recent Users
            </h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-semibold text-gray-900">User #{i}</p>
                    <p className="text-gray-600 text-sm">+91 9876543210</p>
                  </div>
                  <span className="text-gray-500 text-sm">2 days ago</span>
                </div>
              ))}
            </div>
            <Link
              to="/admin/users"
              className="mt-4 text-primary-600 hover:text-primary-700 font-semibold text-sm"
            >
              View All Users →
            </Link>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiBarChart2 size={24} className="text-success-600" />
              System Health
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">
                    API Uptime
                  </span>
                  <span className="text-sm font-bold text-success-600">
                    99.8%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-success-600 h-2 rounded-full"
                    style={{ width: "99.8%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">
                    DB Health
                  </span>
                  <span className="text-sm font-bold text-success-600">
                    Excellent
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-success-600 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">
                    Cache Hit Rate
                  </span>
                  <span className="text-sm font-bold text-accent-600">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-accent-600 h-2 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            <Link
              to="/admin/knowledge"
              className="p-4 text-center border border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition"
            >
              <FiBook className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 text-sm">
                Knowledge Base
              </p>
            </Link>
            <Link
              to="/admin/solutions"
              className="p-4 text-center border border-gray-200 rounded-lg hover:border-accent-600 hover:bg-accent-50 transition"
            >
              <FiTarget className="w-8 h-8 text-accent-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 text-sm">Solutions</p>
            </Link>
            <Link
              to="/admin/offices"
              className="p-4 text-center border border-gray-200 rounded-lg hover:border-success-600 hover:bg-success-50 transition"
            >
              <FiMapPin className="w-8 h-8 text-success-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 text-sm">Offices</p>
            </Link>
            <Link
              to="/admin/users"
              className="p-4 text-center border border-gray-200 rounded-lg hover:border-warning-600 hover:bg-warning-50 transition"
            >
              <FiUsers className="w-8 h-8 text-warning-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 text-sm">Users</p>
            </Link>
            <Link
              to="/admin/settings"
              className="p-4 text-center border border-gray-200 rounded-lg hover:border-danger-600 hover:bg-danger-50 transition"
            >
              <span className="text-2xl">⚙️</span>
              <p className="font-semibold text-gray-900 text-sm">Settings</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
