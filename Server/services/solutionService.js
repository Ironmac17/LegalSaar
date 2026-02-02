const Solution = require("../models/Solution");

const createSolution = async (data) => {
  return Solution.create(data);
};

const getSolutionsByKnowledge = async (knowledgeId) => {
  return Solution.find({
    knowledge: knowledgeId,
    isActive: true
  })
    .populate("offices")
    .sort({ createdAt: 1 });
};

const updateSolution = async (id, data) => {
  return Solution.findByIdAndUpdate(id, data, { new: true });
};

const deleteSolution = async (id) => {
  return Solution.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

module.exports = {
  createSolution,
  getSolutionsByKnowledge,
  updateSolution,
  deleteSolution
};
