const Clause = require("../models/Clause");
const Knowledge = require("../models/Knowledge");
const Solution = require("../models/Solution");

/**
 * This function is LLM-READY.
 * For now it uses rule-based explanation.
 */
const explainClause = async (clauseId) => {
  const clause = await Clause.findById(clauseId)
    .populate("linkedKnowledge");

  if (!clause) {
    throw new Error("Clause not found");
  }

  // 🔹 Base explanation (safe fallback)
  const explanation = `
This clause states the following:

${clause.text}
`.trim();

  // 🔹 Fetch related solutions
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
