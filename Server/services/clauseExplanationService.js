const Clause = require("../models/Clause");
const Solution = require("../models/Solution");

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
    // TODO: Replace with FAISS retrieval + FLAN-T5 generation
    // explanation = await semanticSearch(clause.text) + await flanT5Generate(contextText);
    explanation = "Placeholder: Clause explanation generated via FAISS + FLAN-T5";
  } catch (err) {
    explanation = `
This clause states the following:

${clause.text}
`.trim();
  }

  // 3️⃣ Translation removed (now in Python ML service)

  // 4️⃣ Speech generation removed (TTS service not available)

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
    explanation: explanation,
    linkedKnowledge: clause.linkedKnowledge,
    solutions
  };
};

module.exports = { explainClause };
