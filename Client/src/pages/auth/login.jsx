import { useState, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../auth/AuthContext";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { FiPhone, FiShield, FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const { setUser } = useContext(AuthContext);
  const { success, error: showError } = useToast();
  const navigate = useNavigate();

  const validatePhone = (p) => /^[0-9]{10}$/.test(p);

  const sendOtp = async () => {
    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await api.post("/auth/send-otp", { phone });
      setStep("otp");
      setTimer(60);
      success("OTP sent successfully!");
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send OTP";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/verify-otp", { phone, otp });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      success("Login successful! Redirecting...");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid OTP. Please try again.";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e, callback) => {
    if (e.key === "Enter" && !loading) {
      callback();
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
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-semibold mb-6 transition-colors"
          >
            <FiArrowLeft size={20} />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary-900 to-primary-800 p-3 rounded-full">
                <FiShield className="text-accent-500 w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold text-primary-900">LegalSaas</h1>
            </div>
            <p className="text-gray-700 font-semibold">Secure Citizen Login</p>
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

          {/* Phone Step */}
          {step === "phone" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-primary-900 mb-3">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-600 w-5 h-5" />
                  <input
                    type="tel"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-lg font-semibold"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(
                        e.target.value.replace(/[^0-9]/g, "").slice(0, 10),
                      );
                      setError("");
                    }}
                    onKeyPress={(e) => handleKeyPress(e, sendOtp)}
                    maxLength="10"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  📱 We will send you a 6-digit OTP to verify your identity
                </p>
              </div>

              <Button
                onClick={sendOtp}
                loading={loading}
                disabled={!validatePhone(phone)}
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-primary-900 to-primary-800 hover:from-primary-800 hover:to-primary-700 text-white font-bold"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-primary-900 mb-3">
                  Enter OTP
                </label>
                <p className="text-gray-700 text-sm font-medium mb-4">
                  ✓ OTP sent to{" "}
                  <span className="text-accent-600 font-bold">+91 {phone}</span>
                </p>
                <input
                  type="text"
                  className="w-full px-4 py-4 border-2 border-accent-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600 text-center text-4xl tracking-widest font-bold text-primary-900"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6));
                    setError("");
                  }}
                  onKeyPress={(e) => handleKeyPress(e, verifyOtp)}
                  maxLength="6"
                  disabled={loading}
                />
              </div>

              <Button
                onClick={verifyOtp}
                loading={loading}
                disabled={otp.length !== 6}
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-primary-900 to-primary-800 hover:from-primary-800 hover:to-primary-700 text-white font-bold"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

              <button
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError("");
                  setTimer(0);
                }}
                className="w-full text-accent-600 hover:text-accent-700 font-bold py-2 transition-colors"
                disabled={loading}
              >
                Change Phone Number
              </button>

              {timer > 0 ? (
                <p className="text-center text-gray-600 text-sm font-medium">
                  ⏱️ Resend OTP in{" "}
                  <span className="text-accent-600 font-bold">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={sendOtp}
                  className="w-full text-accent-600 hover:text-accent-700 font-bold py-2 transition-colors"
                  disabled={loading}
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-xs">
              By logging in, you agree to our{" "}
              <a
                href="#"
                className="text-accent-600 font-bold hover:text-accent-700"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-accent-600 font-bold hover:text-accent-700"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
