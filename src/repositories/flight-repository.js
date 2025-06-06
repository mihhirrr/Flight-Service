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

  /**
   * Retrieves flights matching the provided query filters and sorting criteria.
   *
   * @param {Object} query - Sequelize 'where' filter object for flight search.
   * @param {Array} sort - Sequelize 'order' array to sort results.
   * @param {Array} includeQuery - Sequelize 'include' array to include related models.
   * @returns {Promise<Array>} List of matching flight records.
   * @throws {AppError} Throws if there's an error querying the database.
   */
  async getFlights(query, sort, includeQuery) {
    try {
      const filteredFlights = await flights.findAll({
        where: query,
        order: sort,
        include: includeQuery,
      });
      return filteredFlights;
    } catch (error) {
      console.error(error);
      throw new AppError(
        'There was an error while retrieving the flights',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = FlightRepository;