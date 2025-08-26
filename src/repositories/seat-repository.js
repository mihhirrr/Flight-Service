const CrudFunctions = require("./crud-repository");
const { seats } = require("../models");
const AppError = require('../utils/Error-handler/AppError')
const { StatusCodes }  = require('http-status-codes')

class SeatRepository extends CrudFunctions {
  constructor() {
    super(seats);
  }

  async update(data, id, transaction) {
      try {
        const response = await this.model.update(data, {
          where: id,
          transaction
        });
  
        if (!response[0]) {
          console.log(id)
          throw new AppError(
            `Resource not found for the ID ${id}`,
            StatusCodes.NOT_FOUND
          );
        }
  
        return response;
      } catch (error) {
        console.log(`Error updating data in ${this.model.name}`);
        throw error;
      }
    }

}

module.exports = SeatRepository;