import { useState, useContext } from "react";
import { adminLogin } from "../../api/adminApi";
import { AuthContext } from "../../auth/AuthContext";
import { useToast } from "../../hooks/useToast";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { success, error: showError } = useToast();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      showError("Please enter both email and password", "Validation Error");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await adminLogin({ email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      success("Admin login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(errorMsg);
      showError(errorMsg, "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      submit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-accent-500">
          {/* Back Button */}
          <Link
            to="/"
            className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-semibold mb-6 transition-colors"
          >
            <FiArrowLeft size={20} />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-br from-primary-900 to-primary-800 p-4 rounded-full mb-4">
              <span className="text-3xl font-bold text-accent-500">⚖️</span>
            </div>
            <h1 className="text-3xl font-bold text-primary-900">
              Admin Portal
            </h1>
            <p className="text-gray-600 mt-2 font-semibold">
              Manage the LegalSaas Platform
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-danger-50 border-l-4 border-danger-600 rounded-lg flex gap-3 items-start">
              <FiAlertCircle
                className="text-danger-600 flex-shrink-0 mt-1"
                size={20}
              />
              <p className="text-danger-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-primary-900 mb-3">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-600 w-5 h-5" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 font-semibold"
                  placeholder="admin@legalsaas.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-primary-900 mb-3">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-600 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 font-semibold"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              onClick={submit}
              loading={loading}
              disabled={!email || !password || loading}
              variant="primary"
              size="lg"
              className="w-full bg-gradient-to-r from-primary-900 to-primary-800 hover:from-primary-800 hover:to-primary-700 text-white font-bold"
            >
              {loading ? "Signing in..." : "Sign In to Admin Panel"}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-xs">
              🔐 Admin access only •{" "}
              <a
                href="#"
                className="text-accent-600 font-bold hover:text-accent-700"
              >
                Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
