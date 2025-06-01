const { FlightRepository } = require("../repositories");
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");

const flightsRepository = new FlightRepository();

const createFlight = async (data) => {
    try {
      const createdFlight = await flightsRepository.create(data);
      return createdFlight;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      }
      console.log("There was an error while creating the flight");
      throw error;
    }
  };

const getFlights = async (query)=>{
  try {
    const filteredFlights = await flightsRepository.getFlights(query);
    return filteredFlights;
  } catch (error) {
    throw error
  }
}


module.exports = {
    createFlight,
    getFlights
}
