const Clause = require("../models/Clause");
const Knowledge = require("../models/Knowledge");
const Solution = require("../models/Solution");
const { detectIntent } = require("./intentDetectionService");
const { semanticSearch } = require("./semanticSearchService");
const { callLLM } = require("../ml/llm/llmClient");

const resolveQuestion = async ({ question, documentId, lang }) => {
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
  try {
    const semanticIds = await semanticSearch(question);
    if (Array.isArray(semanticIds)) {
      semanticIds.forEach((id) => knowledgeIdSet.add(id));
    }
  } catch (err) {
    // semantic search failed - ignore
  }

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

  // Gather context for prompt
  const contextParts = [];
  if (clauses.length > 0) {
    contextParts.push(
      "Document clauses:\n" + clauses.map((c) => c.text).join("\n\n")
    );
  }
  if (knowledge.length > 0) {
    contextParts.push(
      "Legal knowledge:\n" +
      knowledge
        .map((k) => k.explanation || k.title || "")
        .join("\n\n")
    );
  }

  // always query LLM; if we have context include it, otherwise just ask directly
  let aiError = false;
  let aiErrorMessage = "";

  try {
    let prompt;
    if (contextParts.length > 0) {
      prompt = `You are a helpful legal assistant. The user will ask a legal question below. Use the context provided to **answer the question** by drawing on the document clauses and legal knowledge. Do not simply repeat the context verbatim; summarise or paraphrase the relevant points and address the question clearly. If the context is insufficient, you may still provide an answer based on general legal knowledge, but clearly indicate when you are doing so.

Context:
${contextParts.join(
        "\n\n"
      )}

Question: ${question}

Answer:`;
    } else {
      // no context – answer general legal question
      prompt = `You are a helpful legal assistant. The user will ask a legal question. Answer it clearly and concisely using your legal knowledge.

Question: ${question}

Answer:`;
    }

    explanation = await callLLM(prompt);

    // if model returns unhelpful no-info message but we had clauses, fallback
    if (
      clauses.length > 0 &&
      explanation &&
      /no (relevant )?information/i.test(explanation)
    ) {
      explanation =
        "Based on the uploaded document:\n\n" +
        clauses.map((c) => c.text).join(" ");
    }
  } catch (err) {
    // LLM call failed; set flag and build fallback explanation
    aiError = true;
    // try to grab OpenAI error details if present
    if (err.response && err.response.data && err.response.data.error) {
      const { message, code, type } = err.response.data.error;
      aiErrorMessage = `${message} (${code || type})`;
    } else {
      aiErrorMessage = err.message || "unknown error";
    }
    explanation = "(AI service unavailable, showing raw information below.)";
    if (clauses.length > 0) {
      explanation += "\n\n" +
        clauses.map((c) => c.text).join(" ");
    } else if (knowledge.length > 0) {
      explanation += "\n\n" +
        knowledge.map((k) => k.explanation || k.title || "").join(" ");
    }
  }

  if (!explanation) {
    if (clauses.length > 0) {
      explanation =
        "Based on the uploaded document:\n\n" +
        clauses.map((c) => c.text).join(" ");
    } else if (knowledge.length > 0) {
      explanation =
        "Based on legal knowledge:\n\n" +
        knowledge
          .map((k) => k.explanation || k.title || "")
          .join(" ");
    } else {
      explanation = "No relevant information found for this question.";
    }
  }

  if (!explanation) {
    if (clauses.length > 0) {
      explanation =
        "Based on the uploaded document:\n\n" +
        clauses.map((c) => c.text).join(" ");
    } else if (knowledge.length > 0) {
      explanation =
        "Based on legal knowledge:\n\n" +
        knowledge
          .map((k) => k.explanation || k.title || "")
          .join(" ");
    } else {
      explanation = "No relevant information found for this question.";
    }
  }

  /* 6️⃣ FINAL RESPONSE */
  return {
    intent,
    question,
    explanation,
    clauses,
    knowledge,
    solutions,
    aiError,
    aiErrorMessage,
  };
};

module.exports = { resolveQuestion };
