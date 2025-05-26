const CrudFunctions = require("./crud-repository");
const { Airplane } = require("../models");

class AirplaneRepository extends CrudFunctions {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
