import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { FiPhone, FiLock, FiUser, FiShield, FiAlertCircle, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

export default function Login() {
  const [tab, setTab] = useState("login"); // login | signup
  const [loginMethod, setLoginMethod] = useState("password"); // password | otp
  const [step, setStep] = useState("form"); // form | otp_verify
  
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoOtpCode, setDemoOtpCode] = useState(null); // For showcasing OTP

  const { loginPassword, register, sendOtp, verifyOtp } = useContext(AuthContext);
  const { success, error: showError } = useToast();
  const navigate = useNavigate();

  const validatePhone = (p) => /^[0-9]{10}$/.test(p);

  // Clear states when toggling tabs
  useEffect(() => {
    setError("");
    setDemoOtpCode(null);
  }, [tab, loginMethod, step]);

  const handleAction = async () => {
    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      if (tab === "signup") {
        if (!name || !password) {
          throw new Error("Name and password are required");
        }
        const res = await register(name, phone, password);
        setDemoOtpCode(res.otpCode); // Show demo code
        setOtp(res.otpCode); // Auto-fill it on screen
        success("Registration started! Please verify OTP.");
        setStep("otp_verify");
      } 
      else if (tab === "login" && loginMethod === "password") {
        if (!password) throw new Error("Password is required");
        await loginPassword(phone, password);
        success("Login successful! Redirecting...");
        navigate("/home");
      } 
      else if (tab === "login" && loginMethod === "otp") {
        const res = await sendOtp(phone);
        setDemoOtpCode(res.otpCode);
        setOtp(res.otpCode); // Auto-fill it on screen
        success("OTP sent to your phone!");
        setStep("otp_verify");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Action failed";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await verifyOtp(phone, otp);
      success("Verification successful! Redirecting...");
      navigate("/home");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid OTP. Please try again.";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4 font-sans">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary-100 rounded-bl-full opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-100 rounded-tr-full opacity-50 pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-surface rounded-lg shadow-card p-10 border border-gray-100">
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-text-light hover:text-primary font-semibold mb-6 transition-colors text-sm"
          >
            <FiArrowLeft size={16} />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-2">
              <div className="bg-primary p-3 rounded-full shadow-lg">
                <FiShield className="text-secondary w-6 h-6" />
              </div>
              <h1 className="text-3xl font-serif font-bold tracking-wide text-primary">LegalSaas</h1>
            </div>
            <p className="text-text-light font-medium mt-2">
              {step === "otp_verify" 
                ? "Verify your identity" 
                : tab === "login" ? "Secure Portal Login" : "Create your Account"}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded flex gap-3 items-start animate-pulse">
              <FiAlertCircle className="text-red-500 mt-1" size={18} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Demo OTP Banner if any */}
          {demoOtpCode && step === "otp_verify" && (
            <div className="mb-6 p-4 bg-secondary-50 border border-secondary-200 rounded flex gap-3 items-center">
              <FiCheckCircle className="text-secondary-600" size={20} />
              <p className="text-secondary-800 text-sm">
                <strong>Demo OTP:</strong> {demoOtpCode} (Expires in 2 mins)
              </p>
            </div>
          )}

          {step === "form" ? (
            <div className="space-y-6">
              
              {/* Tab Selector */}
              <div className="flex border-b border-gray-200 mb-6 font-medium text-sm">
                <button 
                  className={`flex-1 pb-3 text-center transition-colors ${tab === "login" ? "border-b-2 border-primary text-primary" : "text-text-light hover:text-primary"}`}
                  onClick={() => setTab("login")}
                >
                  Sign In
                </button>
                <button 
                  className={`flex-1 pb-3 text-center transition-colors ${tab === "signup" ? "border-b-2 border-primary text-primary" : "text-text-light hover:text-primary"}`}
                  onClick={() => setTab("signup")}
                >
                  Register
                </button>
              </div>

              {tab === "signup" && (
                <div>
                  <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                    maxLength="10"
                  />
                </div>
              </div>

              {(tab === "signup" || (tab === "login" && loginMethod === "password")) && (
                <div>
                  <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Toggle Login Method for Login Page */}
              {tab === "login" && (
                <div className="flex justify-end">
                  <button 
                    onClick={() => setLoginMethod(prev => prev === 'password' ? 'otp' : 'password')}
                    className="text-xs font-bold text-secondary-600 hover:text-secondary-700 transition"
                  >
                    {loginMethod === "password" ? "Login with OTP instead" : "Login with Password instead"}
                  </button>
                </div>
              )}

              <Button
                onClick={handleAction}
                loading={loading}
                variant="primary"
                size="lg"
                className="w-full bg-primary hover:bg-primary-800 text-surface shadow-md py-4 rounded transition-all tracking-wide"
              >
                {loading ? "Processing..." : (tab === "login" ? "Sign In" : "Create Account (Next step: OTP)")}
              </Button>

            </div>
          ) : (
            // OTP verification step
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-primary mb-3 text-center">
                  Verification Code
                </label>
                <p className="text-text-light text-sm mb-6 text-center">
                  Enter the 6-digit code sent to <span className="font-bold">+91 {phone}</span>
                </p>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:border-primary focus:ring-primary text-center text-3xl tracking-[0.5em] font-medium text-primary shadow-inner"
                  placeholder="------"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                  maxLength="6"
                />
              </div>

              <Button
                onClick={handleVerifyOtp}
                loading={loading}
                disabled={otp.length !== 6}
                variant="primary"
                size="lg"
                className="w-full bg-primary hover:bg-primary-800 text-surface shadow-md py-4 rounded transition-all tracking-wide"
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </Button>

              <div className="text-center">
                <button
                  onClick={() => {
                    setStep("form");
                    setOtp("");
                    setDemoOtpCode(null);
                  }}
                  className="text-text-light hover:text-primary text-sm font-semibold transition"
                >
                  Back to {tab === "signup" ? "Registration" : "Login"}
                </button>
              </div>
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-text-light text-xs font-medium">
            By proceeding, you agree to the <a href="#" className="underline hover:text-primary">Terms of Service</a> & <a href="#" className="underline hover:text-primary">Privacy Policy</a>
          </p>
        </div>

      </div>
    </div>
  );
}
