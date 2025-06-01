const CrudFunctions = require("./crud-repository");
const { Airport } = require('../models')

class AirportRepository extends CrudFunctions {
  constructor() {
    super(Airport);
  }
}

module.exports = AirportRepository;