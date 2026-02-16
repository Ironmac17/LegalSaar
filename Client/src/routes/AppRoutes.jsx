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

import LandingPage from "../pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - No MainLayout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Routes - With MainLayout */}
        <Route
          path="/home"
          element={
            <MainLayout>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/ask"
          element={
            <MainLayout>
              <ProtectedRoute>
                <AskQuestion />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <MainLayout>
              <ProtectedRoute>
                <UploadDocument />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/assistant"
          element={
            <MainLayout>
              <ProtectedRoute>
                <Assistant />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/legal-info"
          element={
            <MainLayout>
              <ProtectedRoute>
                <LegalInfo />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/offices"
          element={
            <MainLayout>
              <ProtectedRoute>
                <Offices />
              </ProtectedRoute>
            </MainLayout>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <MainLayout>
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/admin/knowledge"
          element={
            <MainLayout>
              <ProtectedRoute adminOnly>
                <KnowledgeBase />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <MainLayout>
              <ProtectedRoute adminOnly>
                <Users />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/admin/solutions"
          element={
            <MainLayout>
              <ProtectedRoute adminOnly>
                <Solutions />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/admin/offices"
          element={
            <MainLayout>
              <ProtectedRoute adminOnly>
                <AdminOffices />
              </ProtectedRoute>
            </MainLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <MainLayout>
              <ProtectedRoute adminOnly>
                <Settings />
              </ProtectedRoute>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
