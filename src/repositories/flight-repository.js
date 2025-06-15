const CrudFunctions = require("./crud-repository");
const { flights, Airport } = require('../models');
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");

/**
 * Repository class for managing flight data with CRUD and custom query capabilities.
 * Extends generic CRUD functions with additional flight-specific methods.
 */
class FlightRepository extends CrudFunctions {
  constructor() {
    super(flights);
  }

  async getFlightsByPk(id, includeQuery) {
    try {
      const flight = await flights.findByPk(id, {
        include: includeQuery,
      });
      return flight;
    } catch (error) {
      console.log(error)
      throw new AppError(
        'There was an error while retrieving the flights',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getFlights(query, sort, includeQuery) {
    try {
      const filteredFlights = await flights.findAll({
        where: query,
        order: sort,
        include: includeQuery,
      });
      return filteredFlights;
    } catch (error) {
      throw new AppError(
        'There was an error while retrieving the flights',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = FlightRepository;