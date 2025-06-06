const { FlightRepository } = require("../repositories");
const { Airplane, Airport } = require('../models');
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");
const { Op } = require('sequelize');
const { CustomFilter, CustomSort } = require('../utils/helpers');

const flightsRepository = new FlightRepository();

/**
 * Creates a new flight record in the database.
 *
 * @param {Object} data - Flight data to be created.
 * @returns {Promise<Object>} The created flight record.
 * @throws {AppError} Throws if validation fails or on other errors.
 */
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

/**
 * Retrieves flights matching the query filters and sorts.
 *
 * @param {Object} query - Query parameters for filtering and sorting flights.
 * @returns {Promise<Array>} List of flights matching the criteria.
 * @throws {AppError} Throws on database retrieval errors.
 */
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

module.exports = {
  createFlight,
  getFlights
};