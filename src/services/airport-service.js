const { AirportRepository } = require("../repositories");
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");

const airportRepository = new AirportRepository();

const createAirport = async (data) => {
  try {
    const createdAirport = await airportRepository.create(data);
    return createdAirport;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
    console.log("There was an error while creating the airport");
    throw error;
  }
};

const updateAirport = async (id, data) => {
  try {
    const updatedAirport = await airportRepository.update(id, data);
    return updatedAirport;
  } catch (error) {
    throw error;
  }
};

const deleteAirport = async (id) => {
  try {
    const deletedAirport = await airportRepository.delete(id);
    return deletedAirport;
  } catch (error) {
    throw error;
  }
};

const getAllAirports = async () => {
  try {
    const getAllAirports = await airportRepository.findAll();
    return getAllAirports;
  } catch (error) {
    if(error.name == 'TypeError'){
      throw new AppError('Something went wrong!', StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

const getAirportById = async (id) => {
  try {
    const RetrievedAirport = await airportRepository.find(id);
    return RetrievedAirport;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAirport,
  updateAirport,
  deleteAirport,
  getAllAirports,
  getAirportById,
};
