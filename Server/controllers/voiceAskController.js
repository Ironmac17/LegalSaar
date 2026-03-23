const { resolveQuestion } = require("../services/questionResolverService");

const voiceAskController = async (req, res, next) => {
  try {
    const { question } = req.body;
    const language = req.query.lang || "en";
    const voiceEnabled = true;

    // 1️⃣ Use provided question (STT removed)
    const transcript = question;

    // 2️⃣ Resolve question (RAG)
    const result = await resolveQuestion({
      question: transcript,
      documentId: null
    });

    // Build context text for explanation
    const contextText = `
QUESTION:
${transcript}

RELEVANT INFORMATION:
${result.knowledge.map(k => k.description).join("\n")}
`;

    // 3️⃣ LLM Explanation
    // TODO: Replace with FAISS retrieval + FLAN-T5 generation
    // let explanation = await semanticSearch(question) + await flanT5Generate(contextText);
    let explanation = "Placeholder: Explanation generated via FAISS + FLAN-T5";

    // 4️⃣ Translation removed (now in Python ML service)

    // 5️⃣ Speech output removed (TTS service not available)

    res.json({
      transcript,
      explanation,
      knowledge: result.knowledge,
      solutions: result.solutions
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { voiceAskController };
