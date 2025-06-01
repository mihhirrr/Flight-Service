const CrudFunctions = require("./crud-repository");
const { flights } = require('../models')

class FlightRepository extends CrudFunctions {
  constructor() {
    super(flights);
  }
}

module.exports = FlightRepository;