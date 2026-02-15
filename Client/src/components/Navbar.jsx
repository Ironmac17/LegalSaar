import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `px-3 py-2 rounded font-medium transition-all ${
      isActive(path)
        ? "bg-primary-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const adminNavLinkClass = (path) =>
    `px-3 py-2 rounded font-medium transition-all ${
      isActive(path)
        ? "bg-accent-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className={`font-bold text-xl ${
              isAdmin ? "text-accent-600" : "text-primary-600"
            }`}
          >
            ⚖️ LegalSaas
          </Link>

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
                  Knowledge Base
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
                <Link to="/" className={navLinkClass("/")}>
                  Home
                </Link>
                <Link to="/assistant" className={navLinkClass("/assistant")}>
                  Assistant
                </Link>
                <Link to="/ask" className={navLinkClass("/ask")}>
                  Ask Question
                </Link>
                <Link to="/upload" className={navLinkClass("/upload")}>
                  Upload
                </Link>
                <Link to="/legal-info" className={navLinkClass("/legal-info")}>
                  Legal Info
                </Link>
                <Link to="/offices" className={navLinkClass("/offices")}>
                  Offices
                </Link>
              </>
            )}
          </div>

          {/* User Section & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {user.phone || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                >
                  <FiLogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <>
                {!isAdmin && (
                  <Link
                    to="/login"
                    className="hidden sm:block px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 transition-all"
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
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
                  to="/"
                  className={navLinkClass("/") + " block"}
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
                  Upload
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
                {!user && (
                  <Link
                    to="/login"
                    className="block px-4 py-2 rounded bg-primary-600 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
