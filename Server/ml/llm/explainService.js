const fs = require("fs");
const path = require("path");
const { callLLM } = require("./llmClient");

const promptTemplate = fs.readFileSync(
  path.join(__dirname, "prompts/explainClause.prompt.txt"),
  "utf-8"
);

const explainWithLLM = async (contextText) => {
  if (!contextText || contextText.trim().length === 0) {
    return "Information not available in the system.";
  }

  const prompt = promptTemplate.replace("{{CONTEXT}}", contextText);

  return await callLLM(prompt);
};

module.exports = { explainWithLLM };
