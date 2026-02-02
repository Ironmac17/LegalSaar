const Clause = require("../models/Clause");

const splitIntoClauses = (text) => {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  const clauses = [];
  let current = "";

  for (const line of lines) {
    if (/^(Section|Clause|\d+\.)/i.test(line)) {
      if (current) clauses.push(current);
      current = line;
    } else {
      current += " " + line;
    }
  }

  if (current) clauses.push(current);
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
