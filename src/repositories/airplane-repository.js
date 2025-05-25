const CrudFunctions = require("./crud-class");
const { Airplane } = require("../models");

class AirplaneRepository extends CrudFunctions {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
