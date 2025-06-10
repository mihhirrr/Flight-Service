const { FlightRepository } = require("../repositories");
const { Airplane, Airport } = require('../models');
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");
const { Op } = require('sequelize');
const { CustomFilter, CustomSort } = require('../utils/helpers');

const flightsRepository = new FlightRepository();

const createFlight = async (data) => {
  try {
    const createdFlight = await flightsRepository.create(data);
    return createdFlight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      throw new AppError(error.message || 'There was a problem while creating the flight', StatusCodes.BAD_REQUEST);
    }
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getFlights = async (query) => {

  // Build filter and sort objects based on query
  try {
  const FilterQuery = new CustomFilter(query).buildFilterObject();
  const SortQuery = new CustomSort(query).buildSortObject();
  const includeQuery = [
    {
      model: Airplane,
      required: true,
    },
    {
      model: Airport,
      as: 'DepartureAirport',
      required: true,
    },
    {
      model: Airport,
      as: 'ArrivalAirport',
      required: true,
    },
  ]

  const customFilter = {
    [Op.and]: [
      { departureAirportCode: { [Op.eq]: FilterQuery.route1.departureAirportCode } },
      { arrivalAirportCode: { [Op.eq]: FilterQuery.route1.arrivalAirportCode } },
      { departureTime: { [Op.between]: [`${FilterQuery.departureTime} 00:00:00`, `${FilterQuery.departureTime} 23:59:59`] } },
      { Fare: { [Op.between]: [FilterQuery.priceRange.minPrice, FilterQuery.priceRange.maxPrice] } },
    ],
  };

    const foundFlights = await flightsRepository.getFlights(customFilter, SortQuery, includeQuery);
    return foundFlights;
  } catch (error) {
    throw new AppError(error.message || 'There was a problem while finding the flights', 
      StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getFlightById = async (id) => {
  try {
    const RetrievedFlight = await flightsRepository.find(id);
    return RetrievedFlight;
  } catch (error) {
    if(error.StatusCode === StatusCodes.NOT_FOUND)  error.message = 'Flight not found!';
    throw new AppError(error.message || 'There was a problem while creating the flight', error.StatusCode);
  }
};

const updateFlight = async (id, data) => {
  try {
    const updatedFlight = await flightsRepository.update(id, data);
    return updatedFlight;
  } catch (error) {
    if(error.StatusCode === StatusCodes.NOT_FOUND)  error.message = 'Flight not found!';
    throw new AppError(error.message || 'There was a problem while updating the flight', error.StatusCode);
  }
};

module.exports = {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight
};