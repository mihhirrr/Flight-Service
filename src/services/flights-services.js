const { FlightRepository } = require("../repositories");
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");
const { Op, where } = require('sequelize')

const flightsRepository = new FlightRepository();

const createFlight = async (data) => {
    try {
      const createdFlight = await flightsRepository.create(data);
      return createdFlight;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      }
      console.log("There was an error while creating the flight");
      throw error;
    }
  };

const getFlights = async (query)=>{
  // console.log(query)
    let customFilter = {}
    if(query.route1 && query.departureTime){
      // console.log(query.route1,query.departureTime)
        customFilter = {
          [Op.and]: [ 
            { departureAirportCode: { [Op.eq]: query.route1.departureAirportCode } },
            { arrivalAirportCode: { [Op.eq]: query.route1.arrivalAirportCode } },
            // { departureTime: { [Op.like]: `${query.departureTime}%` } },
        ],
      }
    }

    try {
      const foundFlights = await flightsRepository.getFlights(customFilter)
      return foundFlights;
    } catch (error) {
      throw new AppError('There was a problem while finding the flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createFlight,
    getFlights
}

// mysql> select * from flights where departureAirportCode = 'BLR' AND arrivalAirportCode = 'MUM' AND departureTime LIKE '2025-06-01%';




