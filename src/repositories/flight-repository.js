const CrudFunctions = require("./crud-repository");
const { flights } = require('../models');
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");

class FlightRepository extends CrudFunctions {
  constructor() {
    super(flights);
  }

  async getFlights(query) {
    try {
      // console.log(query.where)
      const filteredFlights = await flights.findAll( { where: query } );
      return filteredFlights
    } catch (error) {
      console.log(error)
        throw new AppError('There was an error while retrieving the flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}

module.exports = FlightRepository;