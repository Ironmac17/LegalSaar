import { useState } from "react";
import { adminLogin } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await adminLogin({ email, password });
    navigate("/admin/dashboard");
  };

  return (
    <div className="p-10">
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="block mb-3 border p-2"/>
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} className="block mb-3 border p-2"/>
      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2">Login</button>
    </div>
  );
}
