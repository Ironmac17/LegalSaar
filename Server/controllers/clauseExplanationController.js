const { explainClause } = require("../services/clauseExplanationService");

const explainClauseController = async (req, res, next) => {
  try {
    const { clauseId } = req.params;

    const result = await explainClause(clauseId, {
      language: req.query.lang,
      voice: req.query.voice === "true"
    });


    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { explainClauseController };
