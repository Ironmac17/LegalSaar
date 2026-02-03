const INTENTS = require("../constants/intentTypes");

const detectIntent = (question) => {
  const q = question.toLowerCase();

  if (q.includes("appeal") || q.includes("challenge")) {
    return INTENTS.APPEAL;
  }

  if (q.includes("deadline") || q.includes("last date") || q.includes("time")) {
    return INTENTS.DEADLINE;
  }

  if (q.includes("penalty") || q.includes("fine") || q.includes("punishment")) {
    return INTENTS.PENALTY;
  }

  if (q.includes("office") || q.includes("where") || q.includes("go")) {
    return INTENTS.OFFICE;
  }

  if (q.includes("document") || q.includes("papers")) {
    return INTENTS.DOCUMENTS;
  }

  if (q.includes("how") || q.includes("process") || q.includes("procedure")) {
    return INTENTS.PROCEDURE;
  }

  return INTENTS.GENERAL;
};

module.exports = { detectIntent };
