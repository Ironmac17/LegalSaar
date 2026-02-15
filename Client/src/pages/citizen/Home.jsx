import { Link } from "react-router-dom";
import {
  FiMic,
  FiUpload,
  FiMapPin,
  FiBooks,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

export default function Home() {
  const features = [
    {
      icon: <FiMic className="w-12 h-12" />,
      title: "Voice-Enabled Assistant",
      description:
        "Ask legal questions using voice in your preferred language. Our AI assistant understands Indian laws and provides clear explanations.",
    },
    {
      icon: <FiUpload className="w-12 h-12" />,
      title: "Document Analysis",
      description:
        "Upload PDFs, images, or documents. We extract clauses and explain them in simple language you can understand.",
    },
    {
      icon: <FiMapPin className="w-12 h-12" />,
      title: "Find Government Offices",
      description:
        "Locate the right government office for your legal needs with addresses, contact details, and directions.",
    },
    {
      icon: <FiBooks className="w-12 h-12" />,
      title: "Legal Knowledge Base",
      description:
        "Access simplified explanations of laws, rights, and procedures relevant to Indian citizens.",
    },
    {
      icon: <FiShield className="w-12 h-12" />,
      title: "Secure & Private",
      description:
        "Your documents and queries are secure. We never share your information without consent.",
    },
    {
      icon: <FiTrendingUp className="w-12 h-12" />,
      title: "Multi-Language Support",
      description:
        "Access legal help in 10+ Indian languages including Hindi, Tamil, Telugu, Kannada, and more.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* HERO SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Legal Help for Everyone
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-primary-100">
            Understand legal documents, ask questions by voice, and find
            government offices in your language
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <Link
              to="/assistant"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 transition-all hover:shadow-lg inline-flex items-center justify-center gap-2"
            >
              <FiMic size={20} /> Open AI Assistant
            </Link>
            <Link
              to="/ask"
              className="bg-accent-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-accent-700 transition-all hover:shadow-lg inline-flex items-center justify-center gap-2"
            >
              <FiBooks size={20} /> Ask a Question
            </Link>
            <Link
              to="/upload"
              className="bg-success-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-success-700 transition-all hover:shadow-lg inline-flex items-center justify-center gap-2"
            >
              <FiUpload size={20} /> Upload Document
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Why Choose LegalSaas?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Designed specifically for citizens who need simple, trustworthy
            legal guidance
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-600 to-accent-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Understand Your Rights?
          </h2>
          <p className="text-lg mb-8 text-accent-100">
            Get instant, AI-powered legal guidance in your own language
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-white text-accent-600 px-8 py-4 rounded-lg font-bold hover:bg-accent-50 transition-all"
            >
              Sign In / Register
            </Link>
            <a
              href="#"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-primary-600 mb-2">10+</h3>
              <p className="text-gray-600">Languages Supported</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-accent-600 mb-2">1000+</h3>
              <p className="text-gray-600">Legal Documents Analyzed</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-success-600 mb-2">
                5000+
              </h3>
              <p className="text-gray-600">Citizens Helped</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-warning-600 mb-2">24/7</h3>
              <p className="text-gray-600">Service Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is LegalSaas free to use?",
                a: "Yes, the basic features are completely free. Premium features may be available in the future.",
              },
              {
                q: "Are the legal explanations accurate?",
                a: "Our AI is trained on verified Indian laws and guidelines, but always consult a lawyer for specific legal advice.",
              },
              {
                q: "What languages are supported?",
                a: "We support English and 9+ Indian languages including Hindi, Tamil, Telugu, Kannada, Malayalam, and more.",
              },
              {
                q: "Is my data private?",
                a: "Yes, we prioritize your privacy. Documents and queries are encrypted and never shared without consent.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <summary className="font-bold text-gray-900 cursor-pointer">
                  {faq.q}
                </summary>
                <p className="text-gray-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
