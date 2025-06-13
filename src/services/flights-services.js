const { FlightRepository, AirplaneRepository } = require("../repositories");
const { Airplane, Airport } = require('../models');
const db = require('../models')
const { lockAirplaneTable, lockFlightsTable } = require('./queries')
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");
const { Op } = require('sequelize');
const { CustomFilter, CustomSort } = require('../utils/helpers');
const { message } = require("../utils/common-utils/success");

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

  // Build filter and sort objects based on user query
  try {
  const FilterQuery = new CustomFilter(query).buildFilterObject();
  const SortQuery = new CustomSort(query).buildSortObject();

  //creating includeQuery Array to pass to flightsRepository.getFlights for joining the Airplane and Airport Tables 
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

  // creating custom filter query to pass to flightsRepository.getFlights filter the flights on the basis of user selection for routes
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
    await db.sequelize.query(lockFlightsTable(id)); // Row lock to tackle race condition
    const updatedFlight = await flightsRepository.update(id, data);
    return updatedFlight;
  } catch (error) {
    if(error.StatusCode === StatusCodes.NOT_FOUND)  error.message = 'Flight not found!';
    throw new AppError(error.message || 'There was a problem while updating the flight', error.StatusCode);
  }
};

const updateAvailableSeats = async(id, seatSelection, decrement) =>{

    try {
      const t = await db.sequelize.transaction();
      const flight = await flightsRepository.find(id);
      await db.sequelize.query(lockAirplaneTable(flight.airplaneId))    // calling row lock on Airplane table to update the seat selection
      const Airplane = await flight.getAirplane();
      const selection = {}

      //dynamically creating the selection object to pass to decrement/increment
      if (seatSelection.Economy) selection.EconomyCapacity = seatSelection.Economy;
      if (seatSelection.Business) selection.BusinessClassCapacity = seatSelection.Business;
      if (seatSelection.FirstClass) selection.FirstClassCapacity = seatSelection.FirstClass;

      if(decrement) await Airplane.decrement(selection, { transaction: t } )     
      else await Airplane.increment(selection, { transaction: t })
      await t.commit();
      return 'Seated updated Successfully!';
    
    } catch (error) {
      await t.rollback();
      throw new AppError('Unable to fulfill the request', StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight,
  updateAvailableSeats
};