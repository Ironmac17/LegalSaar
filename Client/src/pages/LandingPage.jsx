import { Link } from "react-router-dom";
import {
  FiMic,
  FiUpload,
  FiMapPin,
  FiBookOpen,
  FiShield,
  FiGlobe,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import landingImage from "../assets/image.png";

export default function LandingPage() {
  const features = [
    {
      icon: <FiMic className="w-12 h-12" />,
      title: "Voice-Enabled Assistant",
      description:
        "Ask legal questions using voice in your preferred language. Our AI assistant understands Indian laws and provides clear explanations.",
      gradient: "from-primary-700 to-primary-900",
    },
    {
      icon: <FiUpload className="w-12 h-12" />,
      title: "Document Analysis",
      description:
        "Upload PDFs, images, or documents. We extract clauses and explain them in simple language you can understand.",
      gradient: "from-accent-600 to-accent-800",
    },
    {
      icon: <FiMapPin className="w-12 h-12" />,
      title: "Find Government Offices",
      description:
        "Locate the right government office for your legal needs with addresses, contact details, and directions.",
      gradient: "from-primary-700 to-primary-900",
    },
    {
      icon: <FiBookOpen className="w-12 h-12" />,
      title: "Legal Knowledge Base",
      description:
        "Access simplified explanations of laws, rights, and procedures relevant to Indian citizens.",
      gradient: "from-accent-600 to-accent-800",
    },
    {
      icon: <FiShield className="w-12 h-12" />,
      title: "Secure & Private",
      description:
        "Your documents and queries are secure. We never share your information without consent.",
      gradient: "from-primary-700 to-primary-900",
    },
    {
      icon: <FiGlobe className="w-12 h-12" />,
      title: "Multi-Language Support",
      description:
        "Access legal help in 10+ Indian languages including Hindi, Tamil, Telugu, Kannada, and more.",
      gradient: "from-accent-600 to-accent-800",
    },
  ];

  const benefits = [
    "No legal knowledge required - we explain everything simply",
    "Available 24/7 - access help anytime you need it",
    "Completely confidential and secure",
    "Free for all Indian citizens",
    "Quick answers to your legal questions",
    "Expert-reviewed legal information",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImage})` }}
      >
        {/* optional semi-transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="mb-8 inline-block">
            <div className="text-6xl mb-4">⚖️</div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Legal Help for <span className="text-accent-500">Everyone</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Understand legal documents, ask questions by voice, and find
            government offices.
            <br />
            <span className="text-accent-400 font-semibold">
              All in your language.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap mb-12">
            <Link
              to="/login"
              className="group bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold px-8 py-4 rounded-lg transition-all hover:shadow-xl inline-flex items-center justify-center gap-2 text-lg"
            >
              Get Started
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login?tab=admin"
              className="bg-white hover:bg-gray-50 text-primary-900 font-bold px-8 py-4 rounded-lg border-2 border-white transition-all hover:shadow-lg inline-flex items-center justify-center gap-2 text-lg"
            >
              Admin Login
            </Link>
          </div>

          <div className="text-sm text-gray-300 mb-8">
            No credit card required • Free for all citizens
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent-600 font-semibold text-lg mb-3">
              FEATURES
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6">
              Everything You Need for Legal Help
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to
              understand Indian legal matters with ease and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${feature.gradient} p-8 rounded-xl text-white hover:shadow-2xl transition-all transform hover:scale-105 duration-300`}
              >
                <div className="mb-6 inline-block p-4 bg-white bg-opacity-20 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white text-opacity-90 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent-500 font-semibold text-lg mb-3">
                WHY CHOOSE US
              </p>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                Built for Citizens Like You
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                We understand that legal matters can be confusing. That's why
                we've created a platform that makes legal help accessible to
                everyone, regardless of their background or language.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent-500 text-primary-900">
                        <FiCheck size={16} className="font-bold" />
                      </div>
                    </div>
                    <p className="text-gray-200 text-lg group-hover:text-white transition-colors">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link
                  to="/login"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold px-8 py-4 rounded-lg transition-all hover:shadow-xl inline-flex items-center justify-center gap-2 text-lg"
                >
                  Start Now
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl blur-3xl opacity-30"></div>
              <div className="relative bg-white bg-opacity-5 backdrop-blur p-8 rounded-2xl border border-accent-500 border-opacity-30">
                <div className="space-y-6 text-white">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🔒</div>
                    <h3 className="font-bold text-xl mb-2">
                      Bank-Level Security
                    </h3>
                    <p className="text-gray-300">
                      Your documents and personal information are encrypted and
                      protected.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl mb-3">⚡</div>
                    <h3 className="font-bold text-xl mb-2">Lightning Fast</h3>
                    <p className="text-gray-300">
                      Get answers to your legal questions in seconds, not days.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl mb-3">📱</div>
                    <h3 className="font-bold text-xl mb-2">Works Everywhere</h3>
                    <p className="text-gray-300">
                      Access on mobile, tablet, or desktop - use whenever you
                      need it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent-600 font-semibold text-lg mb-3">
              GETTING STARTED
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6">
              Simple Three Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                number: "1",
                title: "Create Account",
                description:
                  "Sign up with your phone number and verify with OTP",
              },
              {
                number: "2",
                title: "Choose Your Help",
                description:
                  "Ask questions, upload documents, or find government offices",
              },
              {
                number: "3",
                title: "Get Answers",
                description:
                  "Receive clear, simple explanations in your preferred language",
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-full mb-6 text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-3xl text-accent-500">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl mx-4 lg:mx-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Get Legal Help?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of Indian citizens who are now able to understand and
            access legal help with confidence.
          </p>
          <Link
            to="/login"
            className="group bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold px-10 py-4 rounded-lg transition-all hover:shadow-2xl inline-flex items-center justify-center gap-2 text-lg"
          >
            Create Free Account
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FOOTER CTA */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <p className="text-gray-600 mb-4">
          Have questions? Check our{" "}
          <a
            href="#help"
            className="text-accent-600 font-bold hover:text-accent-700"
          >
            FAQ
          </a>{" "}
          or contact support
        </p>
        <p className="text-sm text-gray-500">
          © 2026 LegalSaas. All rights reserved. Made for Indian Citizens.
        </p>
      </div>
    </div>
  );
}
