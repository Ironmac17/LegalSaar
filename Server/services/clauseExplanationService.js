const Clause = require("../models/Clause");
const Solution = require("../models/Solution");
const { explainWithLLM } = require("../ml/llm/explainService");

const explainClause = async (clauseId) => {
  const clause = await Clause.findById(clauseId)
    .populate("linkedKnowledge");

  if (!clause) {
    throw new Error("Clause not found");
  }

  // 1️⃣ Build trusted context (THIS IS KEY)
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

  // 2️⃣ Call LLM (safe + grounded)
  let explanation;
  try {
    explanation = await explainWithLLM(contextText);
  } catch (err) {
    // 🔒 Fallback if LLM fails
    explanation = `
This clause states the following:

${clause.text}
`.trim();
  }

  // 3️⃣ Fetch related solutions
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
    explanation,
    linkedKnowledge: clause.linkedKnowledge,
    solutions
  };
};

module.exports = { explainClause };
