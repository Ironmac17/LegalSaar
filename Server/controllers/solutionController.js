const {
  createSolution,
  getSolutionsByKnowledge,
  updateSolution,
  deleteSolution
} = require("../services/solutionService");
const Solution = require("../models/Solution");

const createSolutionController = async (req, res, next) => {
  try {
    const solution = await createSolution(req.body);
    res.status(201).json(solution);
  } catch (error) {
    next(error);
  }
};

const searchSolutionsController = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.status(400).json({ message: "Query parameter 'q' is required" });
    }

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const results = await Solution.find({
      isActive: true,
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    }).limit(50);

    res.json(results);
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
  searchSolutionsController,
  getSolutionsController,
  updateSolutionController,
  deleteSolutionController
};
