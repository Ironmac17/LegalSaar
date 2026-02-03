const Clause = require("../models/Clause");
const Knowledge = require("../models/Knowledge");
const Solution = require("../models/Solution");
const { detectIntent } = require("./intentDetectionService");

const resolveQuestion = async ({ question, documentId }) => {
  const intent = detectIntent(question);

  let clauses = [];
  let knowledge = [];
  let solutions = [];

  // 🔹 If question relates to uploaded document
  if (documentId) {
    clauses = await Clause.find({ document: documentId })
      .populate("linkedKnowledge");

    const knowledgeIds = new Set();
    clauses.forEach(c =>
      c.linkedKnowledge.forEach(k => knowledgeIds.add(k._id.toString()))
    );

    knowledge = await Knowledge.find({
      _id: { $in: [...knowledgeIds] },
      status: "approved",
      isActive: true
    });
  }

  // 🔹 Fetch solutions
  if (knowledge.length > 0) {
    solutions = await Solution.find({
      knowledge: { $in: knowledge.map(k => k._id) },
      isActive: true
    }).populate("offices");
  }

  return {
    intent,
    question,
    clauses,
    knowledge,
    solutions
  };
};

module.exports = { resolveQuestion };
