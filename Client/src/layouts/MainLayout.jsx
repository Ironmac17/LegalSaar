import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">⚖️ LegalSaas</h3>
              <p className="text-gray-400 text-sm">
                AI-powered legal accessibility for everyone
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Citizen</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/assistant" className="hover:text-white">
                    Assistant
                  </a>
                </li>
                <li>
                  <a href="/ask" className="hover:text-white">
                    Ask Question
                  </a>
                </li>
                <li>
                  <a href="/upload" className="hover:text-white">
                    Upload Document
                  </a>
                </li>
                <li>
                  <a href="/offices" className="hover:text-white">
                    Find Offices
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Admin</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/admin" className="hover:text-white">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/admin/dashboard" className="hover:text-white">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/admin/knowledge" className="hover:text-white">
                    Knowledge Base
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} AI Legal Accessibility Platform. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
