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

  /* 1️⃣ DOCUMENT-GROUNDED CONTEXT (highest priority) */
  if (documentId) {
    clauses = await Clause.find({ document: documentId })
      .populate("linkedKnowledge");

    clauses.forEach((clause) => {
      clause.linkedKnowledge.forEach((k) => {
        knowledgeIdSet.add(k._id.toString());
      });
    });
  }

  /* 2️⃣ SEMANTIC SEARCH (ML retrieval) */
  const semanticIds = await semanticSearch(question);
  semanticIds.forEach((id) => knowledgeIdSet.add(id));

  /* 3️⃣ FETCH FINAL APPROVED KNOWLEDGE */
  if (knowledgeIdSet.size > 0) {
    knowledge = await Knowledge.find({
      _id: { $in: Array.from(knowledgeIdSet) },
      status: "approved",
      isActive: true
    });
  }

  /* 4️⃣ FETCH RELATED SOLUTIONS */
  if (knowledge.length > 0) {
    solutions = await Solution.find({
      knowledge: { $in: knowledge.map((k) => k._id) },
      isActive: true
    }).populate("offices");
  }

  /* 5️⃣ GENERATE EXPLANATION (IMPORTANT ADDITION) */
  let explanation = "";

  if (clauses.length > 0) {
    explanation =
      "Based on the uploaded document:\n\n" +
      clauses.map((c) => c.text).join(" ");
  }
  else if (knowledge.length > 0) {
    explanation =
      "Based on legal knowledge:\n\n" +
      knowledge
        .map((k) => k.explanation || k.title || "")
        .join(" ");
  }
  else {
    explanation = "No relevant information found for this question.";
  }

  /* 6️⃣ FINAL RESPONSE */
  return {
    intent,
    question,
    explanation,
    clauses,
    knowledge,
    solutions
  };
};

module.exports = { resolveQuestion };
