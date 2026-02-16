import Navbar from "../components/Navbar";
import ToastContainer from "../components/ToastContainer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <ToastContainer />
      <main className="flex-grow">{children}</main>

      {/* Footer with Law Court Theme */}
      <footer className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-12 mt-20 border-t-4 border-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">⚖️</span>
                <h3 className="text-xl font-bold text-accent-400">LegalSaas</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                AI-powered legal accessibility for every Indian citizen. Making
                justice and legal guidance accessible to all.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-accent-400 text-lg">
                Features
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="/home"
                    className="hover:text-accent-400 transition-colors"
                  >
                    AI Assistant
                  </a>
                </li>
                <li>
                  <a
                    href="/ask"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Ask Question
                  </a>
                </li>
                <li>
                  <a
                    href="/upload"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Upload Document
                  </a>
                </li>
                <li>
                  <a
                    href="/offices"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Find Offices
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-accent-400 text-lg">
                For Admins
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="/admin"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Admin Login
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    User Management
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-accent-400 text-lg">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-accent-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm text-center md:text-left">
                © {new Date().getFullYear()} LegalSaas. All rights reserved. |
                Empowering Citizens with Legal Knowledge
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <span className="text-xs text-gray-400">
                  Made with ⚖️ for India
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
