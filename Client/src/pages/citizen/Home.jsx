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
      color: "from-primary-500 to-primary-700 shadow-primary-500/30",
    },
    {
      icon: <FiUpload className="w-12 h-12 text-accent-100" />,
      title: t("documentAnalysis", language),
      description: t("documentAnalysisDesc", language),
      to: "/upload",
      color: "from-accent-500 to-accent-700 shadow-accent-500/30",
    },
    {
      icon: <FiBookOpen className="w-12 h-12 text-primary-100" />,
      title: t("askQuestions", language),
      description: t("askQuestionsDesc", language),
      to: "/ask",
      color: "from-primary-500 to-primary-700 shadow-primary-500/30",
    },
    {
      icon: <FiMapPin className="w-12 h-12 text-accent-100" />,
      title: t("findOffices", language),
      description: t("findOfficesDesc", language),
      to: "/offices",
      color: "from-accent-500 to-accent-700 shadow-accent-500/30",
    },
    {
      icon: <FiBookOpen className="w-12 h-12 text-primary-100" />,
      title: t("legalInfo", language),
      description: t("legalInfoDesc", language),
      to: "/legal-info",
      color: "from-primary-500 to-primary-700 shadow-primary-500/30",
    },
    {
      icon: <FiGlobe className="w-12 h-12 text-accent-100" />,
      title: t("multiLanguage", language),
      description: t("multiLanguageDesc", language),
      to: "/assistant",
      color: "from-accent-500 to-accent-700 shadow-accent-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl animate-bounce">👋</span>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
              {t("welcome", language)}, {user?.name || t("citizen", language)}!
            </h1>
          </div>
          <p className="text-xl text-primary-100 mb-6 max-w-3xl font-light">
            {t("oneStopSubtitle", language)}
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 text-center bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 mb-4">
              {t("whatCanYouDo", language)}
            </h2>
            <p className="text-lg text-gray-600">
              {t("accessFeatures", language)}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Link
                key={i}
                to={feature.to}
                className={`bg-gradient-to-br ${feature.color} p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 group cursor-pointer border border-white/20 backdrop-blur-lg relative overflow-hidden`}
              >
                {/* Glass sheen */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="mb-6 inline-block p-4 bg-white/20 backdrop-blur-md rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-wide drop-shadow-sm">
                  {feature.title}
                </h3>
                <p className="text-white/90 mb-6 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:translate-x-2 transition-transform bg-white/10 w-max px-4 py-2 rounded-full border border-white/20">
                  {t("explore", language)} <FiArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="bg-primary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-primary-900 mb-16 text-center">
            {t("quickStart", language)}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            {/* Connecting line for steps */}
            <div className="hidden md:block absolute top-[20%] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary-200 via-accent-300 to-primary-200 -z-10"></div>
            
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
              <div key={i} className="text-center group">
                <div className="text-5xl mb-6 bg-white w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg border-4 border-primary-50 group-hover:scale-110 transition-transform duration-300">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">{step.desc}</p>
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
      <section className="bg-gradient-to-br from-primary-900 to-indigo-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-accent-500 relative overflow-hidden">
        {/* Deep background logo or pattern could go here */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto z-10">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <span className="text-accent-400 text-4xl">💡</span> {t("tips", language)}
          </h2>
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
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border-l-4 border-accent-500 hover:bg-white/20 transition-all cursor-default"
              >
                <h3 className="font-bold text-lg mb-2 text-accent-300">
                  {tip.title}
                </h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
