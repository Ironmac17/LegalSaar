const Clause = require("../models/Clause");
const Knowledge = require("../models/Knowledge");

const linkClausesToKnowledge = async (documentId) => {
  // Fetch approved knowledge only
  const knowledgeList = await Knowledge.find({
    status: "approved",
    isActive: true
  });

  const clauses = await Clause.find({ document: documentId });

  for (const clause of clauses) {
    const clauseText = clause.text.toLowerCase();

    const matchedKnowledge = [];
    const matchedKeywords = [];

    for (const knowledge of knowledgeList) {
      for (const keyword of knowledge.keywords || []) {
        if (clauseText.includes(keyword.toLowerCase())) {
          matchedKnowledge.push(knowledge._id);
          matchedKeywords.push(keyword);
          break;
        }
      }
    }

    clause.linkedKnowledge = matchedKnowledge;
    clause.matchedKeywords = matchedKeywords;

    await clause.save();
  }
};

module.exports = { linkClausesToKnowledge };
