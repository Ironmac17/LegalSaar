import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/citizen/Home";
import AskQuestion from "../pages/citizen/AskQuestion";
import UploadDocument from "../pages/citizen/UploadDocument";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import KnowledgeBase from "../pages/admin/KnowledgeBase";
import Users from "../pages/admin/Users";
import Assistant from "../pages/citizen/Assistant";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/assistant" element={<Assistant />} />
        
        
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/knowledge" element={<KnowledgeBase />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}
