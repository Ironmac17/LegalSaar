const Clause = require("../models/Clause");
const Knowledge = require("../models/Knowledge");
const Solution = require("../models/Solution");
const { detectIntent } = require("./intentDetectionService");
const { semanticSearch } = require("./semanticSearchService");

const resolveQuestion = async ({ question, documentId }) => {
  const intent = detectIntent(question);

  let clauses = [];
  let knowledge = [];
  let solutions = [];

  const knowledgeIdSet = new Set();

  // 1️⃣ DOCUMENT-GROUNDED CONTEXT (HIGHEST PRIORITY)
  if (documentId) {
    clauses = await Clause.find({ document: documentId })
      .populate("linkedKnowledge");

    clauses.forEach((clause) => {
      clause.linkedKnowledge.forEach((k) => {
        knowledgeIdSet.add(k._id.toString());
      });
    });
  }

  // 2️⃣ SEMANTIC SEARCH (ML / FAISS)
  // This fills gaps if document does not mention everything
  const semanticIds = await semanticSearch(question);

  semanticIds.forEach((id) => knowledgeIdSet.add(id));

  // 3️⃣ FETCH FINAL APPROVED KNOWLEDGE (ONLY FROM DB)
  if (knowledgeIdSet.size > 0) {
    knowledge = await Knowledge.find({
      _id: { $in: Array.from(knowledgeIdSet) },
      status: "approved",
      isActive: true
    });
  }

  // 4️⃣ FETCH RELATED SOLUTIONS
  if (knowledge.length > 0) {
    solutions = await Solution.find({
      knowledge: { $in: knowledge.map((k) => k._id) },
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
