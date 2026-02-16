import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { FiMenu, FiX, FiLogOut, FiHome } from "react-icons/fi";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");
  const isLanding = location.pathname === "/";
  const isLogin =
    location.pathname === "/login" || location.pathname === "/admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Law court theme: Black navbar with gold accents
  const navLinkClass = (path) =>
    `px-4 py-2 rounded-lg font-medium transition-all ${
      isActive(path)
        ? "bg-accent-500 text-primary-900 shadow-lg"
        : "text-gray-200 hover:bg-primary-700 hover:text-white"
    }`;

  const adminNavLinkClass = (path) =>
    `px-4 py-2 rounded-lg font-medium transition-all ${
      isActive(path)
        ? "bg-accent-500 text-primary-900 shadow-lg"
        : "text-gray-200 hover:bg-primary-700 hover:text-white"
    }`;

  // Don't show navbar on login pages
  if (isLogin) return null;

  return (
    <nav className="bg-gradient-to-r from-primary-900 to-primary-800 shadow-2xl sticky top-0 z-50 border-b-2 border-accent-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-2xl text-white hover:text-accent-400 transition-colors flex items-center gap-2"
          >
            <span className="text-3xl">⚖️</span>
            <span className="hidden sm:inline">LegalSaas</span>
          </Link>

          {/* Landing Page - Simple Navigation */}
          {isLanding ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="px-6 py-2 rounded-lg bg-white text-primary-900 font-semibold hover:bg-gray-100 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/login?tab=admin"
                className="px-6 py-2 rounded-lg bg-accent-500 text-primary-900 font-semibold hover:bg-accent-600 transition-all"
              >
                Admin
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {isAdmin ? (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className={adminNavLinkClass("/admin/dashboard")}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/knowledge"
                      className={adminNavLinkClass("/admin/knowledge")}
                    >
                      Knowledge
                    </Link>
                    <Link
                      to="/admin/solutions"
                      className={adminNavLinkClass("/admin/solutions")}
                    >
                      Solutions
                    </Link>
                    <Link
                      to="/admin/offices"
                      className={adminNavLinkClass("/admin/offices")}
                    >
                      Offices
                    </Link>
                    <Link
                      to="/admin/users"
                      className={adminNavLinkClass("/admin/users")}
                    >
                      Users
                    </Link>
                    <Link
                      to="/admin/settings"
                      className={adminNavLinkClass("/admin/settings")}
                    >
                      Settings
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/home" className={navLinkClass("/home")}>
                      <FiHome className="inline mr-2" size={18} />
                      Home
                    </Link>
                    <Link
                      to="/assistant"
                      className={navLinkClass("/assistant")}
                    >
                      Assistant
                    </Link>
                    <Link to="/ask" className={navLinkClass("/ask")}>
                      Ask
                    </Link>
                    <Link to="/upload" className={navLinkClass("/upload")}>
                      Upload
                    </Link>
                    <Link
                      to="/legal-info"
                      className={navLinkClass("/legal-info")}
                    >
                      Legal Info
                    </Link>
                    <Link to="/offices" className={navLinkClass("/offices")}>
                      Offices
                    </Link>
                  </>
                )}
              </div>
            </>
          )}

          {/* User Section & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-accent-400 hidden sm:inline">
                  {user.phone || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger-600 text-white hover:bg-danger-700 transition-all font-semibold"
                >
                  <FiLogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {!isLanding && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-primary-700 rounded-lg transition-all"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {!isLanding && mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-primary-800 rounded-lg p-4">
            {isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className={adminNavLinkClass("/admin/dashboard") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/knowledge"
                  className={adminNavLinkClass("/admin/knowledge") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Knowledge Base
                </Link>
                <Link
                  to="/admin/solutions"
                  className={adminNavLinkClass("/admin/solutions") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solutions
                </Link>
                <Link
                  to="/admin/offices"
                  className={adminNavLinkClass("/admin/offices") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Offices
                </Link>
                <Link
                  to="/admin/users"
                  className={adminNavLinkClass("/admin/users") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Users
                </Link>
                <Link
                  to="/admin/settings"
                  className={adminNavLinkClass("/admin/settings") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/home"
                  className={navLinkClass("/home") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/assistant"
                  className={navLinkClass("/assistant") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Assistant
                </Link>
                <Link
                  to="/ask"
                  className={navLinkClass("/ask") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ask Question
                </Link>
                <Link
                  to="/upload"
                  className={navLinkClass("/upload") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Upload Document
                </Link>
                <Link
                  to="/legal-info"
                  className={navLinkClass("/legal-info") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Legal Info
                </Link>
                <Link
                  to="/offices"
                  className={navLinkClass("/offices") + " block"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Offices
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
