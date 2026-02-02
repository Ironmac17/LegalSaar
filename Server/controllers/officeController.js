const {
  createOffice,
  getAllOffices,
  getOfficeById,
  updateOffice,
  deleteOffice
} = require("../services/officeService");

const createOfficeController = async (req, res, next) => {
  try {
    const office = await createOffice(req.body);
    res.status(201).json(office);
  } catch (error) {
    next(error);
  }
};

const getOfficesController = async (req, res, next) => {
  try {
    const { city, department } = req.query;

    const filters = {};
    if (city) filters.city = city;
    if (department) filters.department = department;

    const offices = await getAllOffices(filters);
    res.json(offices);
  } catch (error) {
    next(error);
  }
};

const getOfficeController = async (req, res, next) => {
  try {
    const office = await getOfficeById(req.params.id);
    if (!office) {
      return res.status(404).json({ message: "Office not found" });
    }
    res.json(office);
  } catch (error) {
    next(error);
  }
};

const updateOfficeController = async (req, res, next) => {
  try {
    const office = await updateOffice(req.params.id, req.body);
    res.json(office);
  } catch (error) {
    next(error);
  }
};

const deleteOfficeController = async (req, res, next) => {
  try {
    await deleteOffice(req.params.id);
    res.json({ message: "Office deactivated" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOfficeController,
  getOfficesController,
  getOfficeController,
  updateOfficeController,
  deleteOfficeController
};
