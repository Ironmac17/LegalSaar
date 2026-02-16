import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import {
  FiMic,
  FiUpload,
  FiMapPin,
  FiBookOpen,
  FiShield,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";

export default function Home() {
  const { user } = useContext(AuthContext);

  const features = [
    {
      icon: <FiMic className="w-12 h-12" />,
      title: "Voice Assistant",
      description: "Ask legal questions using voice in your language",
      to: "/assistant",
      color: "from-primary-700 to-primary-900",
    },
    {
      icon: <FiUpload className="w-12 h-12" />,
      title: "Document Analysis",
      description: "Upload & analyze legal documents",
      to: "/upload",
      color: "from-accent-600 to-accent-800",
    },
    {
      icon: <FiBookOpen className="w-12 h-12" />,
      title: "Ask Questions",
      description: "Get expert answers to your legal queries",
      to: "/ask",
      color: "from-primary-700 to-primary-900",
    },
    {
      icon: <FiMapPin className="w-12 h-12" />,
      title: "Find Offices",
      description: "Locate government offices near you",
      to: "/offices",
      color: "from-accent-600 to-accent-800",
    },
    {
      icon: <FiBookOpen className="w-12 h-12" />,
      title: "Legal Info",
      description: "Learn about your rights and laws",
      to: "/legal-info",
      color: "from-primary-700 to-primary-900",
    },
    {
      icon: <FiGlobe className="w-12 h-12" />,
      title: "Multi-Language",
      description: "Access help in 10+ Indian languages",
      to: "/assistant",
      color: "from-accent-600 to-accent-800",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-800 border-b-4 border-accent-500 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">👋</span>
            <h1 className="text-4xl sm:text-5xl font-bold">
              Welcome, {user?.name || "Citizen"}!
            </h1>
          </div>
          <p className="text-lg text-gray-200 mb-6">
            Your one-stop platform for legal guidance in India. Understand laws,
            get expert advice, and know your rights.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              What Can You Do?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Access all our features to get legal help instantly. Choose what
              you need:
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Link
                key={i}
                to={feature.to}
                className={`bg-gradient-to-br ${feature.color} p-8 rounded-xl text-white hover:shadow-2xl transition-all transform hover:scale-105 duration-300 group cursor-pointer border-2 border-opacity-20 border-white`}
              >
                <div className="mb-5 inline-block p-4 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-opacity-90">
                  {feature.title}
                </h3>
                <p className="text-white text-opacity-90 mb-4 text-sm">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:translate-x-2 transition-transform">
                  Explore <FiArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="bg-primary-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-900 mb-12 text-center">
            Quick Start Guide
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                number: "1️⃣",
                title: "Choose Your Need",
                desc: "Select from AI Assistant, Document Upload, or Ask Questions",
              },
              {
                number: "2️⃣",
                title: "Ask or Upload",
                desc: "Ask in your language or upload any legal document",
              },
              {
                number: "3️⃣",
                title: "Get Answers",
                desc: "Receive clear, simple explanations instantly",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-accent-50 to-primary-50 border-l-4 border-accent-600 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <FiShield className="text-accent-600 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  ⚖️ Your Privacy is Protected
                </h3>
                <p className="text-gray-700 mb-4">
                  All your documents and queries are completely secure and
                  confidential. We use bank-level encryption to protect your
                  data. Your information is never shared without your explicit
                  consent.
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  ✓ Encrypted end-to-end • ✓ No data sharing • ✓ GDPR compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-primary-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-accent-500">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">💡 Helpful Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Use Voice for Better Results",
                desc: "Speak naturally - our AI understands conversational language",
              },
              {
                title: "Be Specific in Questions",
                desc: "Include details about your location and situation",
              },
              {
                title: "Check Multiple Languages",
                desc: "Get explanations in 10+ Indian languages",
              },
              {
                title: "Save Important Information",
                desc: "Keep notes of answers for future reference",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="bg-primary-800 p-6 rounded-lg border-l-4 border-accent-500"
              >
                <h3 className="font-bold text-lg mb-2 text-accent-400">
                  {tip.title}
                </h3>
                <p className="text-gray-200 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
