const {
  createKnowledge,
  getAllKnowledge,
  getKnowledgeById,
  updateKnowledge,
  deleteKnowledge
} = require("../services/knowledgeService");

const Knowledge = require("../models/Knowledge");


const createKnowledgeController = async (req, res, next) => {
  try {
    const knowledge = await createKnowledge(req.body);
    res.status(201).json(knowledge);
  } catch (error) {
    next(error);
  }
};

const getKnowledgeListController = async (req, res, next) => {
  try {
    const { category, state, keyword } = req.query;

    const filters = {};
    if (category) {
      // support case-insensitive partial match on category
      filters.category = new RegExp(category, "i");
    }
    if (state) filters.applicableStates = state;
    if (keyword) filters.keywords = keyword;

    const knowledgeList = await getAllKnowledge(filters);
    res.json(knowledgeList);
  } catch (error) {
    next(error);
  }
};

const searchKnowledgeController = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.status(400).json({ message: "Query parameter 'q' is required" });
    }

    // Basic text search across title, explanation and keywords
    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const results = await Knowledge.find({
      isActive: true,
      status: "approved",
      $or: [
        { title: { $regex: regex } },
        { explanation: { $regex: regex } },
        { keywords: { $in: [new RegExp(q, "i")] } },
        { category: { $regex: regex } },
      ],
    }).limit(50);

    res.json(results);
  } catch (error) {
    next(error);
  }
};

const getKnowledgeController = async (req, res, next) => {
  try {
    const knowledge = await getKnowledgeById(req.params.id);
    if (!knowledge || !knowledge.isActive) {
      return res.status(404).json({ message: "Knowledge not found" });
    }
    res.json(knowledge);
  } catch (error) {
    next(error);
  }
};

const updateKnowledgeController = async (req, res, next) => {
  try {
    const knowledge = await updateKnowledge(req.params.id, req.body);
    res.json(knowledge);
  } catch (error) {
    next(error);
  }
};

const deleteKnowledgeController = async (req, res, next) => {
  try {
    await deleteKnowledge(req.params.id);
    res.json({ message: "Knowledge deactivated" });
  } catch (error) {
    next(error);
  }
};

const approveKnowledgeController = async (req, res, next) => {
  try {
    const knowledge = await Knowledge.findById(req.params.id);

    if (!knowledge) {
      return res.status(404).json({ message: "Knowledge not found" });
    }

    knowledge.status = "approved";
    knowledge.approvedBy = req.user.id;
    knowledge.approvedAt = new Date();

    await knowledge.save();

    res.json({ message: "Knowledge approved", knowledge });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createKnowledgeController,
  getKnowledgeListController,
  searchKnowledgeController,
  getKnowledgeController,
  updateKnowledgeController,
  deleteKnowledgeController,
  approveKnowledgeController
};
