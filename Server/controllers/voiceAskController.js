const { speechToText } = require("../ml/voice/sttService");
const { resolveQuestion } = require("../services/questionResolverService");
const { explainWithLLM } = require("../ml/llm/explainService");
const { translateText } = require("../ml/translation/translateService");
const { generateSpeech } = require("../ml/voice/ttsService");

const voiceAskController = async (req, res, next) => {
  try {
    const language = req.query.lang || "en";
    const voiceEnabled = true;

    // 1️⃣ Speech → Text
    const transcript = await speechToText(req.file.path);

    // 2️⃣ Resolve question (RAG)
    const result = await resolveQuestion({
      question: transcript,
      documentId: null
    });

    // Build context text for explanation
    const contextText = `
QUESTION:
${transcript}

RELEVANT INFORMATION:
${result.knowledge.map(k => k.description).join("\n")}
`;

    // 3️⃣ LLM Explanation
    let explanation = await explainWithLLM(contextText);

    // 4️⃣ Translation
    if (language !== "en") {
      explanation = await translateText(explanation, language);
    }

    // 5️⃣ Speech output
    let audio = null;
    if (voiceEnabled) {
      audio = await generateSpeech(explanation, language);
    }

    res.json({
      transcript,
      explanation,
      audio,
      knowledge: result.knowledge,
      solutions: result.solutions
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { voiceAskController };
