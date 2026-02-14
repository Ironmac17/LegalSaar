const Clause = require("../models/Clause");

const splitIntoClauses = (text) => {
  if (!text || text.trim().length === 0) return [];

  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  const clauses = [];
  let current = "";

  for (const line of lines) {
    if (/^(Section|Clause|\d+\.)/i.test(line)) {
      if (current) clauses.push(current.trim());
      current = line;
    } else {
      current += " " + line;
    }
  }

  if (current) clauses.push(current.trim());

  /* fallback: if nothing structured found, split by paragraphs */
  if (clauses.length === 0) {
    return text
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(Boolean);
  }

  return clauses;
};


const saveClauses = async (documentId, text) => {
  const rawClauses = splitIntoClauses(text);

  const saved = [];
  for (const clauseText of rawClauses) {
    saved.push(
      await Clause.create({
        document: documentId,
        text: clauseText
      })
    );
  }

  return saved;
};

module.exports = { saveClauses };
