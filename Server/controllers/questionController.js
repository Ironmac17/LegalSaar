const { resolveQuestion } = require("../services/questionResolverService");

const askQuestionController = async (req, res, next) => {
  try {
    const { question, documentId } = req.body;
    const { lang } = req.query;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const result = await resolveQuestion({ question, documentId, lang });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { askQuestionController };
