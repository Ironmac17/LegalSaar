const Knowledge = require("../models/Knowledge");

const createKnowledge = async (data) => {
  return Knowledge.create(data);
};

const getAllKnowledge = async (filters = {}) => {
  return Knowledge.find({
    isActive: true,
    status: "approved",
    ...filters
  }).sort({ createdAt: -1 });
};

const getKnowledgeById = async (id) => {
  return Knowledge.findById(id);
};

const updateKnowledge = async (id, data) => {
  return Knowledge.findByIdAndUpdate(id, data, { new: true });
};

const deleteKnowledge = async (id) => {
  return Knowledge.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

module.exports = {
  createKnowledge,
  getAllKnowledge,
  getKnowledgeById,
  updateKnowledge,
  deleteKnowledge
};
