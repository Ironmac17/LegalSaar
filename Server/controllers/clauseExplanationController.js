const { explainClause } = require("../services/clauseExplanationService");

const explainClauseController = async (req, res, next) => {
  try {
    const { clauseId } = req.params;

    const result = await explainClause(clauseId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { explainClauseController };
