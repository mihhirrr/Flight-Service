const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");

const airplaneRepository = new AirplaneRepository();

const createAirplane = async (data) => {
  try {
    const createdAirplane = await airplaneRepository.create(data);
    return createdAirplane;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
    throw new AppError("There was an error while creating the airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const updateAirplane = async (id, data) => {
  try {
    const updatedAirplane = await airplaneRepository.update(id, data);
    return updatedAirplane;
  } catch (error) {
    throw new AppError("There was an error while updating the airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const deleteAirplane = async (id) => {
  try {
    const deletedAirplane = await airplaneRepository.delete(id);
    return deletedAirplane;
  } catch (error) {
    throw new AppError("There was an error while deleting the airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getAllAirplanes = async () => {
  try {
    const getAllAirplanes = await airplaneRepository.findAll();
    return getAllAirplanes;
  } catch (error) {
    throw new AppError("There was an error while retrieving the airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getAirplaneById = async (id) => {
  try {
    const RetrievedAirplane = await airplaneRepository.find(id);
    return RetrievedAirplane;
  } catch (error) {
    throw new AppError("There was an error while retrieving the airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  createAirplane,
  updateAirplane,
  deleteAirplane,
  getAllAirplanes,
  getAirplaneById,
};
