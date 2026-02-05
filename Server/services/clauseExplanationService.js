const Clause = require("../models/Clause");
const Solution = require("../models/Solution");
const { explainWithLLM } = require("../ml/llm/explainService");
const { translateText } = require("../ml/translation/translateService");
const { generateSpeech } = require("../ml/voice/ttsService");

const explainClause = async (clauseId, options = {}) => {
  const { language = "en", voice = false } = options;

  const clause = await Clause.findById(clauseId)
    .populate("linkedKnowledge");

  if (!clause) {
    throw new Error("Clause not found");
  }

  // 1️⃣ Build trusted context
  let contextText = `
CLAUSE:
${clause.text}
`;

  if (clause.linkedKnowledge && clause.linkedKnowledge.length > 0) {
    contextText += `

RELATED LEGAL INFORMATION:
${clause.linkedKnowledge
      .map(k => `- ${k.title}: ${k.description}`)
      .join("\n")}
`;
  }

  // 2️⃣ Call LLM
  let explanation;
  try {
    explanation = await explainWithLLM(contextText);
  } catch (err) {
    explanation = `
This clause states the following:

${clause.text}
`.trim();
  }

  // 3️⃣ Translate if needed
  let translatedExplanation = explanation;
  if (language && language !== "en") {
    try {
      translatedExplanation = await translateText(explanation, language);
    } catch (err) {
      translatedExplanation = explanation;
    }
  }

  // 4️⃣ Generate speech if enabled
  let audioPath = null;
  if (voice) {
    try {
      audioPath = await generateSpeech(translatedExplanation, language);
    } catch (err) {
      audioPath = null;
    }
  }

  // 5️⃣ Fetch related solutions
  let solutions = [];
  if (clause.linkedKnowledge.length > 0) {
    const knowledgeIds = clause.linkedKnowledge.map(k => k._id);
    solutions = await Solution.find({
      knowledge: { $in: knowledgeIds },
      isActive: true
    }).populate("offices");
  }

  return {
    clauseId: clause._id,
    clauseText: clause.text,
    explanation: translatedExplanation,
    audio: audioPath,
    linkedKnowledge: clause.linkedKnowledge,
    solutions
  };
};

module.exports = { explainClause };
