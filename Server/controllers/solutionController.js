const {
  createSolution,
  getSolutionsByKnowledge,
  updateSolution,
  deleteSolution
} = require("../services/solutionService");

const createSolutionController = async (req, res, next) => {
  try {
    const solution = await createSolution(req.body);
    res.status(201).json(solution);
  } catch (error) {
    next(error);
  }
};

const getSolutionsController = async (req, res, next) => {
  try {
    const { knowledgeId } = req.query;

    if (!knowledgeId) {
      return res.status(400).json({ message: "knowledgeId is required" });
    }

    const solutions = await getSolutionsByKnowledge(knowledgeId);
    res.json(solutions);
  } catch (error) {
    next(error);
  }
};

const updateSolutionController = async (req, res, next) => {
  try {
    const solution = await updateSolution(req.params.id, req.body);
    res.json(solution);
  } catch (error) {
    next(error);
  }
};

const deleteSolutionController = async (req, res, next) => {
  try {
    await deleteSolution(req.params.id);
    res.json({ message: "Solution deactivated" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSolutionController,
  getSolutionsController,
  updateSolutionController,
  deleteSolutionController
};
