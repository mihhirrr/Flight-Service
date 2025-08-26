const { StatusCodes } = require('http-status-codes');
const { Error } = require('../utils/common-utils');

async function compareTime(req, res, next) {
  if (new Date(req.body.arrivalTime) > new Date(req.body.departureTime)) {
    next();
  } else {
    const ErrorResponse = { ...Error,
      error: {
        message: 'Departure time should not be greater than Arrival time',
        StatusCode: StatusCodes.BAD_REQUEST
      }
    };
    return res.status(StatusCodes.BAD_REQUEST)
    .json(ErrorResponse);
  }
}

async function getFlightsValidation(req, res, next) {
  if (!(req.query.route1 && req.query.passengerList && req.query.travelClass)) {
    const ErrorResponse = { ...Error ,
      error: {
        message: 'At least one Trip, Travel class, number of travelers each required',
        StatusCode: StatusCodes.BAD_REQUEST
      }
    };
    return res.status(StatusCodes.BAD_REQUEST)
    .json(ErrorResponse);
  }

  if (req.query.route1.split('-')[0] === req.query.route1.split('-')[1]) {
    const ErrorResponse = { ...Error ,
      error: {
        message: 'Both Departure Airport and Arrival Airport cannot be same',
        StatusCode: StatusCodes.BAD_REQUEST
      }
    };
    return res.status(StatusCodes.BAD_REQUEST)
    .json(ErrorResponse);
  }

  next();
}

async function verifyUpdateSeats(req, res, next) {
  if(!req.params.flightId){
    const ErrorResponse = { ...Error ,
      error: {
        message: 'Flight ID not provided',
        StatusCode: StatusCodes.BAD_REQUEST
      }
    };
    return res.status(StatusCodes.BAD_REQUEST)
    .json(ErrorResponse);
  }
  next();
}

module.exports = {
  compareTime,
  getFlightsValidation,
  verifyUpdateSeats
};