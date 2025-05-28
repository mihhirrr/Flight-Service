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
    console.log("There was an error while creating the airplane");
    throw error;
  }
};

const updateAirplane = async (id, data) => {
  try {
    const updatedAirplane = await airplaneRepository.update(id, data);
    return updatedAirplane;
  } catch (error) {
    throw error;
  }
};

const deleteAirplane = async (id) => {
  try {
    const deletedAirplane = await airplaneRepository.delete(id);
    return deletedAirplane;
  } catch (error) {
    throw error;
  }
};

const getAllAirplanes = async () => {
  try {
    const getAllAirplanes = await airplaneRepository.findAll();
    return getAllAirplanes;
  } catch (error) {
    if(error.name == 'TypeError'){
      throw new AppError('Something went wrong!', StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

const getAirplaneById = async (id) => {
  try {
    const RetrievedAirplane = await airplaneRepository.find(id);
    return RetrievedAirplane;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAirplane,
  updateAirplane,
  deleteAirplane,
  getAllAirplanes,
  getAirplaneById,
};
