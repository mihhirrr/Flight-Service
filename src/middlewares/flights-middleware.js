const StatusCodes = require('http-status-codes');
const { Error } = require('../utils/common-utils');

/**
 * Validates that arrivalTime is after departureTime in the request body.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
async function compareTime(req, res, next) {
  if (new Date(req.body.arrivalTime) > new Date(req.body.departureTime)) {
    next();
  } else {
    Error.error.message = 'Departure time should not be greater than Arrival time';
    res.status(StatusCodes.BAD_REQUEST).json(Error);
  }
}

async function getFlightsValidation(req, res, next) {
  if (!(req.query.route1 && req.query.passengerList && req.query.travelClass)) {
    const ErrorResponse = { ...Error };
    ErrorResponse.error.message = 'At least one Trip, Travel class, number of travelers each required';
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (req.query.route1.split('-')[0] === req.query.route1.split('-')[1]) {
    const ErrorResponse = { ...Error };
    ErrorResponse.error.message = 'Both Departure Airport and Arrival Airport cannot be same';
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

async function verifyUpdateSeats(req, res, next) {
  if(!req.params.flightId){
    const ErrorResponse = { ...Error };
    ErrorResponse.error.message = 'Flight ID not provided';
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  compareTime,
  getFlightsValidation,
  verifyUpdateSeats
};