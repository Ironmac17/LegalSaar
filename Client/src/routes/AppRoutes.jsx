import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/login";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/citizen/Home";
import AskQuestion from "../pages/citizen/AskQuestion";
import UploadDocument from "../pages/citizen/UploadDocument";
import Assistant from "../pages/citizen/Assistant";
import Profile from "../pages/citizen/Profile";
import LegalInfo from "../pages/citizen/LegalInfo";
import Offices from "../pages/citizen/Offices";

import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import KnowledgeBase from "../pages/admin/KnowledgeBase";
import Users from "../pages/admin/Users";
import Solutions from "../pages/admin/Solutions";
import AdminOffices from "../pages/admin/Offices";
import Settings from "../pages/admin/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Citizen Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path="/upload" element={<UploadDocument />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/legal-info" element={<LegalInfo />} />
          <Route path="/offices" element={<Offices />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/knowledge" element={<KnowledgeBase />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/solutions" element={<Solutions />} />
          <Route path="/admin/offices" element={<AdminOffices />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
