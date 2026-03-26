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
import { t } from "../../utils/i18n";

export default function Home() {
  const { user, language } = useContext(AuthContext);

  const features = [
    {
      icon: <FiMic className="w-12 h-12" />,
      title: t("voiceAssistant", language),
      description: t("voiceAssistantDesc", language),
      to: "/assistant",
      color: "from-primary-700 to-primary-900",
    },
    {
      icon: <FiUpload className="w-12 h-12" />,
      title: t("documentAnalysis", language),
      description: t("documentAnalysisDesc", language),
      to: "/upload",
      color: "from-accent-600 to-accent-800",
    },
    {
      icon: <FiBookOpen className="w-12 h-12" />,
      title: t("askQuestions", language),
      description: t("askQuestionsDesc", language),
      to: "/ask",
      color: "from-primary-700 to-primary-900",
    },
    {
      icon: <FiMapPin className="w-12 h-12" />,
      title: t("findOffices", language),
      description: t("findOfficesDesc", language),
      to: "/offices",
      color: "from-accent-600 to-accent-800",
    },
    {
      icon: <FiBookOpen className="w-12 h-12" />,
      title: t("legalInfo", language),
      description: t("legalInfoDesc", language),
      to: "/legal-info",
      color: "from-primary-700 to-primary-900",
    },
    {
      icon: <FiGlobe className="w-12 h-12" />,
      title: t("multiLanguage", language),
      description: t("multiLanguageDesc", language),
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
              {t("welcome", language)}, {user?.name || t("citizen", language)}!
            </h1>
          </div>
          <p className="text-lg text-gray-200 mb-6">
            {t("oneStopSubtitle", language)}
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              {t("whatCanYouDo", language)}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t("accessFeatures", language)}
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
                  {t("explore", language)} <FiArrowRight size={18} />
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
            {t("quickStart", language)}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                number: "1️⃣",
                title: t("chooseNeed", language),
                desc: t("accessFeatures", language),
              },
              {
                number: "2️⃣",
                title: t("askOrUpload", language),
                desc: t("documentAnalysisDesc", language),
              },
              {
                number: "3️⃣",
                title: t("getAnswers", language),
                desc: t("askQuestionsDesc", language),
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
                  ⚖️ {t("privacyTitle", language)}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t("privacyDesc", language)}
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  {t("privacyBullet", language)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-primary-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-accent-500">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">💡 {t("tips", language)}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: t("tipOne", language),
                desc: t("tipOneDesc", language),
              },
              {
                title: t("tipTwo", language),
                desc: t("tipTwoDesc", language),
              },
              {
                title: t("tipThree", language),
                desc: t("tipThreeDesc", language),
              },
              {
                title: t("tipFour", language),
                desc: t("tipFourDesc", language),
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
