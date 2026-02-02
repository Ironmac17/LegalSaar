const Office = require("../models/Office");

const createOffice = async (data) => {
  return Office.create(data);
};

const getAllOffices = async (filters = {}) => {
  return Office.find({ isActive: true, ...filters }).sort({ createdAt: -1 });
};

const getOfficeById = async (id) => {
  return Office.findById(id);
};

const updateOffice = async (id, data) => {
  return Office.findByIdAndUpdate(id, data, { new: true });
};

const deleteOffice = async (id) => {
  return Office.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

module.exports = {
  createOffice,
  getAllOffices,
  getOfficeById,
  updateOffice,
  deleteOffice
};
