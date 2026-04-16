import Navbar from "../components/Navbar";
import ToastContainer from "../components/ToastContainer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      <ToastContainer />
      <main className="flex-grow">{children}</main>

      {/* Footer with Law Court Theme */}
      <footer className="bg-primary text-secondary-50 py-12 mt-20 border-t-4 border-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl text-secondary">⚖️</span>
                <h3 className="text-2xl font-serif font-bold text-secondary tracking-wide">LegalSaas</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                AI-powered legal accessibility for every Indian citizen. Making
                justice and legal guidance accessible to all.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-secondary text-lg font-serif">
                Features
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/home" className="hover:text-secondary transition-colors">AI Assistant</a></li>
                <li><a href="/ask" className="hover:text-secondary transition-colors">Ask Question</a></li>
                <li><a href="/upload" className="hover:text-secondary transition-colors">Upload Document</a></li>
                <li><a href="/offices" className="hover:text-secondary transition-colors">Find Offices</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-secondary text-lg font-serif">
                For Admins
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/admin" className="hover:text-secondary transition-colors">Admin Login</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Knowledge Base</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">User Management</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-secondary text-lg font-serif">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-secondary transition-colors">Disclaimer</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-700 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} LegalSaas. All rights reserved. |
                Empowering Citizens with Legal Knowledge
              </p>
              <div className="flex gap-4">
                <span className="text-xs text-gray-500 font-serif italic">
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
