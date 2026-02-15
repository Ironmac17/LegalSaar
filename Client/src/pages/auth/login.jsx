import { useState, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiPhone, FiShield, FiAlertCircle } from "react-icons/fi";
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
      setError(err.response?.data?.message || "Failed to send OTP");
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
      navigate("/assistant");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FiShield className="text-primary-600 w-8 h-8" />
              <h1 className="text-3xl font-bold text-gray-900">LegalSaas</h1>
            </div>
            <p className="text-gray-600">Secure Citizen Login</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-danger-50 border border-danger-200 rounded-lg flex gap-3 items-start">
              <FiAlertCircle
                className="text-danger-600 flex-shrink-0 mt-1"
                size={20}
              />
              <p className="text-danger-700 text-sm">{error}</p>
            </div>
          )}

          {/* Phone Step */}
          {step === "phone" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
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
                <p className="text-xs text-gray-500 mt-2">
                  We will send you an OTP to verify your number
                </p>
              </div>

              <Button
                onClick={sendOtp}
                loading={loading}
                disabled={!validatePhone(phone)}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Send OTP
              </Button>
            </div>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP
                </label>
                <p className="text-gray-600 text-sm mb-4">
                  OTP sent to +91 {phone}
                </p>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-center text-2xl letter-spacing tracking-widest font-bold"
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
                className="w-full"
              >
                Verify OTP
              </Button>

              <button
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError("");
                  setTimer(0);
                }}
                className="w-full text-primary-600 hover:text-primary-700 font-semibold"
                disabled={loading}
              >
                Change Phone Number
              </button>

              {timer > 0 ? (
                <p className="text-center text-gray-600 text-sm">
                  Resend OTP in {timer}s
                </p>
              ) : (
                <button
                  onClick={sendOtp}
                  className="w-full text-primary-600 hover:text-primary-700 font-semibold"
                  disabled={loading}
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-4">
              <Loader />
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              By logging in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
