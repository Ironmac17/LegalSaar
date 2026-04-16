import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { FiMenu, FiX, FiLogOut, FiHome } from "react-icons/fi";
import LanguageSelector from "./LanguageSelector";
import { t } from "../utils/i18n";

export default function Navbar() {
  const { user, setUser, language } = useContext(AuthContext);
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

  // Law court theme: Charcoal dark navbar with gold accents
  const navLinkClass = (path) =>
    `px-4 py-2 rounded font-medium transition-all text-sm ${isActive(path)
      ? "bg-secondary text-primary shadow"
      : "text-gray-300 hover:bg-primary-800 hover:text-white"
    }`;

  const adminNavLinkClass = (path) =>
    `px-4 py-2 rounded font-medium transition-all text-sm ${isActive(path)
      ? "bg-secondary text-primary shadow"
      : "text-gray-300 hover:bg-primary-800 hover:text-white"
    }`;

  if (isLogin) return null;

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50 border-b-2 border-secondary font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-2xl text-surface hover:text-secondary transition-colors flex items-center gap-2 font-serif tracking-wide"
          >
            <span className="text-3xl text-secondary">⚖️</span>
            <span className="hidden sm:inline">LegalSaas</span>
          </Link>

          {/* Landing Page - Simple Navigation */}
          {isLanding ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="px-6 py-2 rounded font-medium text-surface border border-secondary hover:bg-secondary hover:text-primary transition-all text-sm"
              >
                {t("signIn", language)}
              </Link>
              <Link
                to="/login?tab=admin"
                className="px-6 py-2 rounded font-medium bg-secondary text-primary hover:bg-secondary-600 transition-all text-sm shadow-md"
              >
                {t("admin", language)}
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {isAdmin ? (
                  <>
                    <Link to="/admin/dashboard" className={adminNavLinkClass("/admin/dashboard")}>Dashboard</Link>
                    <Link to="/admin/knowledge" className={adminNavLinkClass("/admin/knowledge")}>Knowledge</Link>
                    <Link to="/admin/solutions" className={adminNavLinkClass("/admin/solutions")}>Solutions</Link>
                    <Link to="/admin/offices" className={adminNavLinkClass("/admin/offices")}>Offices</Link>
                    <Link to="/admin/users" className={adminNavLinkClass("/admin/users")}>Users</Link>
                    <Link to="/admin/settings" className={adminNavLinkClass("/admin/settings")}>Settings</Link>
                  </>
                ) : (
                  <>
                    <Link to="/home" className={navLinkClass("/home")}>
                      <FiHome className="inline mr-2" size={16} />
                      {t("home", language)}
                    </Link>
                    <Link to="/assistant" className={navLinkClass("/assistant")}>{t("assistant", language)}</Link>
                    <Link to="/ask" className={navLinkClass("/ask")}>{t("ask", language)}</Link>
                    <Link to="/legal-info" className={navLinkClass("/legal-info")}>{t("legalInfo", language)}</Link>
                    <Link to="/offices" className={navLinkClass("/offices")}>{t("offices", language)}</Link>
                  </>
                )}
              </div>
            </>
          )}

          {/* User Section, Language Selector & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center">
              <LanguageSelector />
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-secondary hidden sm:inline tracking-wider uppercase">
                  {user.phone || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
                >
                  <FiLogOut size={14} />
                  <span className="hidden sm:inline">{t("logout", language)}</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {!isLanding && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-surface hover:bg-primary-800 rounded transition-all"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {!isLanding && mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-primary-800 rounded shadow-inner p-4 mt-2">
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className={adminNavLinkClass("/admin/dashboard") + " block"} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/admin/knowledge" className={adminNavLinkClass("/admin/knowledge") + " block"} onClick={() => setMobileMenuOpen(false)}>Knowledge Base</Link>
                <Link to="/admin/solutions" className={adminNavLinkClass("/admin/solutions") + " block"} onClick={() => setMobileMenuOpen(false)}>Solutions</Link>
                <Link to="/admin/offices" className={adminNavLinkClass("/admin/offices") + " block"} onClick={() => setMobileMenuOpen(false)}>Offices</Link>
                <Link to="/admin/users" className={adminNavLinkClass("/admin/users") + " block"} onClick={() => setMobileMenuOpen(false)}>Users</Link>
                <Link to="/admin/settings" className={adminNavLinkClass("/admin/settings") + " block"} onClick={() => setMobileMenuOpen(false)}>Settings</Link>
              </>
            ) : (
              <>
                <Link to="/home" className={navLinkClass("/home") + " block"} onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/assistant" className={navLinkClass("/assistant") + " block"} onClick={() => setMobileMenuOpen(false)}>Assistant</Link>
                <Link to="/ask" className={navLinkClass("/ask") + " block"} onClick={() => setMobileMenuOpen(false)}>Ask Question</Link>
                <Link to="/legal-info" className={navLinkClass("/legal-info") + " block"} onClick={() => setMobileMenuOpen(false)}>Legal Info</Link>
                <Link to="/offices" className={navLinkClass("/offices") + " block"} onClick={() => setMobileMenuOpen(false)}>Offices</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
