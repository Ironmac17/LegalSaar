import { useState, useEffect, useContext, useRef } from "react";
import api from "../../api/api";
import { FiSearch, FiBook, FiClock } from "react-icons/fi";
import Loader from "../../components/Loader";
import ChatInput from "../../components/ChatInput";
import SpeakButton from "../../components/SpeakButton";
import { AuthContext } from "../../auth/AuthContext";
import { translateText } from "../../utils/translation";

const CATEGORIES = [
  "Labor Laws",
  "Family Law",
  "Criminal Law",
  "Property Law",
  "Constitutional Rights",
  "Government Services",
];

const CATEGORY_TRANSLATIONS = {
  "Labor Laws": {
    hi: "श्रम कानून",
    ta: "தொழிலாளர் சட்டங்கள்",
    te: "కార్మిక చట్టాలు",
    kn: "ಕಾರ್ಮಿಕ ಕಾನೂನುಗಳು",
    ml: "തൊഴിലാളി നിയമങ്ങൾ",
    mr: "कामगार कायदे",
    gu: "મજૂર કાયદા",
    bn: "শ্রম আইন",
    pa: "ਮਜ਼ਦੂਰ ਕਾਨੂੰਨ"
  },
  "Family Law": {
    hi: "परिवार कानून",
    ta: "குடும்ப சட்டம்",
    te: "కుటుంబ చట్టం",
    kn: "ಕುಟುಂಬ ಕಾನೂನು",
    ml: "കുടുംബ നിയമം",
    mr: "कौटुंबिक कायदा",
    gu: "પરિવાર કાયદો",
    bn: "পারিবারিক আইন",
    pa: "ਪਰਿਵਾਰਕ ਕਾਨੂੰਨ"
  },
  "Criminal Law": {
    hi: "फौजदारी कानून",
    ta: "குற்ற சட்டம்",
    te: "నేర చట్టం",
    kn: "ಕ್ರಿಮಿನಲ್ ಕಾನೂನು",
    ml: "ക്രിമിനൽ നിയമം",
    mr: "गुन्हेगारी कायदा",
    gu: "ગુનાહિત કાયદો",
    bn: "ফৌজদারি আইন",
    pa: "ਫੌਜਦਾਰੀ ਕਾਨੂੰਨ"
  },
  "Property Law": {
    hi: "संपत्ति कानून",
    ta: "சொத்து சட்டம்",
    te: "సంపత్తి చట్టం",
    kn: "ಸ್ವತ್ತು ಕಾನೂನು",
    ml: "സ്വത്ത് നിയമം",
    mr: "मालमत्ता कायदा",
    gu: "સંપત્તિ કાયદો",
    bn: "সম্পত্তি আইন",
    pa: "ਜਾਇਦਾਦ ਕਾਨੂੰਨ"
  },
  "Constitutional Rights": {
    hi: "संवैधानिक अधिकार",
    ta: "அரசியல் சாசன உரிமைகள்",
    te: "రాజ్యాంగ హక్కులు",
    kn: "ಸಂವಿಧಾನಿಕ ಹಕ್ಕುಗಳು",
    ml: "സംവിധാനിക അവകാശങ്ങൾ",
    mr: "संविधानिक हक्के",
    gu: "સંવિધાનિક હક્કો",
    bn: "সাংবিধানিক অধিকার",
    pa: "ਸੰਵਿਧਾਨਕ ਅਧਿਕਾਰ"
  },
  "Government Services": {
    hi: "सरकारी सेवाएं",
    ta: "அரசு சேவைகள்",
    te: "ప్రభుత్వ సేవలు",
    kn: "ಸರ್ಕಾರಿ ಸೇವೆಗಳು",
    ml: "സർക്കാർ സേവനങ്ങൾ",
    mr: "सरकारी सेवा",
    gu: "સરકારી સેવાઓ",
    bn: "সরকারি পরিষেবা",
    pa: "ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ"
  }
};

export default function LegalInfo() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [translatedResult, setTranslatedResult] = useState(null);
  const [translating, setTranslating] = useState(false);
  const { language } = useContext(AuthContext);
  const speechRef = useRef(null);

  // Stop speech when component unmounts or language changes
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Translate selected result when language changes
  useEffect(() => {
    if (selectedResult && language !== "en") {
      translateSelectedResult();
    } else if (selectedResult && language === "en") {
      setTranslatedResult(null); // Reset to original
    }
  }, [language, selectedResult]);

  const translateSelectedResult = async () => {
    if (!selectedResult || language === "en") return;

    setTranslating(true);
    try {
      const titleToTranslate = selectedResult.title;
      const contentToTranslate = selectedResult.type === "judgment"
        ? selectedResult.content.replace(/<[^>]*>/g, '') // Strip HTML for translation
        : selectedResult.content;

      const [translatedTitle, translatedContent] = await Promise.all([
        translateText(titleToTranslate, language),
        translateText(contentToTranslate, language)
      ]);

      setTranslatedResult({
        ...selectedResult,
        title: translatedTitle,
        content: translatedContent
      });
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslatedResult(null);
    } finally {
      setTranslating(false);
    }
  };

  const getTranslatedText = (text, translations) => {
    if (language === "en" || !translations[language]) {
      return text;
    }
    return translations[language];
  };

  const headerTranslations = {
    title: {
      hi: "कानूनी ज्ञान आधार",
      ta: "சட்ட அறிவு தளம்",
      te: "చట్టపరమైన జ్ఞాన బేస్",
      kn: "ಕಾನೂನಿ ಜ್ಞಾನ ತಳ",
      ml: "നിയമ ജ്ഞാന ഡാറ്റാബേസ്",
      mr: "कायदेशीर ज्ञान आधार",
      gu: "કાનૂની જ્ઞાન આધાર",
      bn: "আইনি জ্ঞান ভিত্তি",
      pa: "ਕਾਨੂੰਨੀ ਗਿਆਨ ਡਾਟਾਬੇਸ"
    },
    subtitle: {
      hi: "भारतीय कानूनों और आपके अधिकारों के सरलीकृत स्पष्टीकरण खोजें",
      ta: "இந்திய சட்டங்கள் மற்றும் உங்கள் உரிமைகளின் எளிமையான விளக்கங்களைத் தேடுங்கள்",
      te: "భారతీయ చట్టాలు మరియు మీ హక్కుల యొక్క సరళీకృత వివరణలను వెతకండి",
      kn: "ಭಾರತೀಯ ಕಾನೂನುಗಳು ಮತ್ತು ನಿಮ್ಮ ಹಕ್ಕುಗಳ ಸರಳೀಕೃತ ವಿವರಣೆಗಳನ್ನು ಹುಡುಕಿ",
      ml: "ഇന്ത്യൻ നിയമങ്ങളും നിങ്ങളുടെ അവകാശങ്ങളുടെ ലളിതമായ വിശദീകരണങ്ങളും തിരയുക",
      mr: "भारतीय कायदे आणि तुमच्या हक्कांची सोपी स्पष्टीकरणे शोधा",
      gu: "ભારતીય કાયદાઓ અને તમારા હક્કોની સરળ સ્પષ્ટીકરણો શોધો",
      bn: "ভারতীয় আইন এবং আপনার অধিকারের সরলীকৃত ব্যাখ্যা অনুসন্ধান করুন",
      pa: "ਭਾਰਤੀ ਕਾਨੂੰਨਾਂ ਅਤੇ ਤੁਹਾਡੇ ਅਧਿਕਾਰਾਂ ਦੀਆਂ ਸਧਾਰਨ ਸਪਸ਼ਟੀਕਰਨਾਂ ਦੀ ਖੋਜ ਕਰੋ"
    },
    browseTitle: {
      hi: "श्रेणी के अनुसार ब्राउज़ करें",
      ta: "வகைப்படி உலாவு",
      te: "వర్గం వారీగా బ్రౌజ్ చేయండి",
      kn: "ವರ್ಗದ ಪ್ರಕಾರ ಬ್ರೌಸ್ ಮಾಡಿ",
      ml: "വിഭാഗം അനുസരിച്ച് ബ്രൗസ് ചെയ്യുക",
      mr: "श्रेणीनुसार ब्राउझ करा",
      gu: "શ્રેણી અનુસાર બ્રાઉઝ કરો",
      bn: "বিভাগ অনুসারে ব্রাউজ করুন",
      pa: "ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ ਬ੍ਰਾਉਜ਼ ਕਰੋ"
    }
  };

  const combineResults = (knowledgeArr, solutionArr) => {
    const know = knowledgeArr.map((k) => ({
      ...k,
      type: "knowledge",
      content: k.explanation,
    }));
    const sol = solutionArr.map((s) => ({
      ...s,
      type: "solution",
      content: s.description,
    }));
    return [...know, ...sol];
  };

  const search = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      // Try Indian Kanoon API first
      const ikResponse = await api.get(`/indian-kanoon/search?q=${encodeURIComponent(searchQuery)}`);

      if (ikResponse.data.results && ikResponse.data.results.length > 0) {
        setResults(ikResponse.data.results.map(result => ({
          ...result,
          type: "judgment"
        })));
        return;
      }

      // Fallback to local database
      const [kres, sres] = await Promise.all([
        api.get(`/knowledge/search?q=${encodeURIComponent(searchQuery)}`),
        api.get(`/solutions/search?q=${encodeURIComponent(searchQuery)}`),
      ]);
      setResults(combineResults(kres.data, sres.data));
    } catch (err) {
      console.error("Search failed:", err);
      // Try local search as fallback
      try {
        const [kres, sres] = await Promise.all([
          api.get(`/knowledge/search?q=${encodeURIComponent(searchQuery)}`),
          api.get(`/solutions/search?q=${encodeURIComponent(searchQuery)}`),
        ]);
        setResults(combineResults(kres.data, sres.data));
      } catch (localErr) {
        console.error("Local search also failed:", localErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const searchCategory = async (category) => {
    setLoading(true);
    try {
      // Try Indian Kanoon API first
      const ikResponse = await api.get(`/indian-kanoon/search?q=${encodeURIComponent(category)}`);

      if (ikResponse.data.results && ikResponse.data.results.length > 0) {
        setResults(ikResponse.data.results.map(result => ({
          ...result,
          type: "judgment"
        })));
        return;
      }

      // Fallback to local database
      const [kres, sres] = await Promise.all([
        api.get(`/knowledge?category=${encodeURIComponent(category)}`),
        api.get(`/solutions/search?q=${encodeURIComponent(category)}`),
      ]);
      setResults(combineResults(kres.data, sres.data));
    } catch (err) {
      console.error("Category search failed:", err);
      // Try local search as fallback
      try {
        const [kres, sres] = await Promise.all([
          api.get(`/knowledge?category=${encodeURIComponent(category)}`),
          api.get(`/solutions/search?q=${encodeURIComponent(category)}`),
        ]);
        setResults(combineResults(kres.data, sres.data));
      } catch (localErr) {
        console.error("Local category search also failed:", localErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (q) => {
    setQuery(q);
    // if clicking a category button, use category endpoint for guaranteed matches
    if (CATEGORIES.includes(q)) {
      searchCategory(q);
    } else {
      search(q);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiBook className="w-12 h-12 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              {getTranslatedText("Legal Knowledge Base", headerTranslations.title)}
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {getTranslatedText("Search simplified explanations of Indian laws and your rights", headerTranslations.subtitle)}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <ChatInput
            onSend={handleSearch}
            placeholder="Search legal topics, laws, and procedures..."
          />
        </div>

        {/* Categories */}
        {results.length === 0 && !loading && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {getTranslatedText("Browse by Category", headerTranslations.browseTitle)}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSearch(cat)}
                  className="p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-600 hover:shadow-md transition text-left"
                >
                  <p className="font-semibold text-gray-900">{getTranslatedCategory(cat)}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Learn about {getTranslatedCategory(cat).toLowerCase()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <Loader text="Searching legal database..." />
          </div>
        )}

        {/* Results */}
        {results.length > 0 && !selectedResult && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Found {results.length} result{results.length !== 1 ? "s" : ""} for
              "{query}"
            </h2>
            <div className="space-y-4">
              {results.map((result) => (
                <button
                  key={result._id}
                  onClick={() => setSelectedResult(result)}
                  className="w-full p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-600 hover:shadow-lg transition text-left"
                >
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">{result.content}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    {result.category && (
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
                        {result.category}
                      </span>
                    )}
                    {result.type && (
                      <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                        {result.type === "judgment" ? "Court Judgment" : result.type === "solution" ? "Solution" : "Knowledge"}
                      </span>
                    )}
                    {result.source && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        {result.source}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Result */}
        {selectedResult && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <button
              onClick={() => {
                setSelectedResult(null);
                setTranslatedResult(null);
                if (window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
              }}
              className="text-primary-600 hover:text-primary-700 mb-6 font-semibold flex items-center gap-1"
            >
              ← Back to Results
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getDisplayResult().title}
            </h1>

            {getDisplayResult().category && (
              <div className="mb-6">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-semibold">
                  {getDisplayResult().category}
                </span>
                {language !== "en" && (
                  <span className="ml-2 text-sm text-gray-500">
                    (Translated to {language.toUpperCase()})
                  </span>
                )}
              </div>
            )}

            {translating && (
              <div className="mb-4 text-center">
                <Loader text="Translating content..." />
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-8">
              {getDisplayResult().type === "judgment" ? (
                <div dangerouslySetInnerHTML={{ __html: getDisplayResult().content }} />
              ) : (
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                  {getDisplayResult().content}
                </p>
              )}
            </div>

            {/* Source Link */}
            {getDisplayResult().url && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">
                  <strong>Source:</strong>{" "}
                  <a
                    href={getDisplayResult().url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    View on {getDisplayResult().source}
                  </a>
                </p>
              </div>
            )}

            {/* Additional Info */}
            {getDisplayResult().relatedInfo && (
              <div className="mt-8 p-6 bg-accent-50 border border-accent-200 rounded-lg">
                <h3 className="font-bold text-accent-900 mb-4">
                  Related Information
                </h3>
                <p className="text-accent-800">{getDisplayResult().relatedInfo}</p>
              </div>
            )}

            {/* Listen Button */}
            <div className="mt-8 flex justify-center">
              <SpeakButton
                text={
                  getDisplayResult().type === "judgment"
                    ? `${getDisplayResult().title}. ${getDisplayResult().content.replace(/<[^>]*>/g, '')}`
                    : getDisplayResult().title + ". " + getDisplayResult().content
                }
                language={language}
              />
            </div>
          </div>
        )}

        {/* No Results */}
        {results.length === 0 && !loading && query && (
          <div className="text-center py-12">
            <FiSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No results found for "{query}"
            </p>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
