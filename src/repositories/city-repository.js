const CrudFunctions = require("./crud-repository");
const { City } = require('../models')

class CityRepository extends CrudFunctions {
  constructor() {
    super(City);
  }
}

module.exports = CityRepository;
