import { useState, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const sendOtp = async () => {
    await api.post("/auth/send-otp", { phone });
    setStep("otp");
  };

  const verifyOtp = async () => {
    const res = await api.post("/auth/verify-otp", { phone, otp });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    navigate("/assistant");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Citizen Login</h1>

      {step === "phone" && (
        <>
          <input
            className="border p-2 w-full"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            onClick={sendOtp}
            className="mt-3 bg-blue-600 text-white px-4 py-2"
          >
            Send OTP
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            className="border p-2 w-full"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={verifyOtp}
            className="mt-3 bg-green-600 text-white px-4 py-2"
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
