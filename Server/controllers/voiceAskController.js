const { askQuestionController } = require("./questionController");

const voiceAskController = async (req, res, next) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    // Reuse question flow for voice endpoint (including lang translation via ML pipeline)
    return askQuestionController(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = { voiceAskController };
