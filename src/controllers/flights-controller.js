const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");
const { CustomFilter }  = require('../utils/helpers')
const { data } = require("../utils/common-utils/success");
const { parse } = require("dotenv");


async function createFlight(req, res, next) {
  const {
    flightNumber,
    airplaneId,
    departureAirportCode,
    arrivalAirportCode,
    departureTime,
    arrivalTime,
    Fare
  } = req.body;

  try {
    const createdFlight = await FlightService.createFlight({
      flightNumber,
      airplaneId,
      departureAirportCode,
      arrivalAirportCode,
      departureTime,
      arrivalTime,
      Fare
    });

    Success.message = "Flight scheduled successfully";
    Success.data = createdFlight;

    return res.status(StatusCodes.CREATED).json(Success);
  } catch (error) {
    Error.message = "Unable to add Flight";
    Error.error.message = error.message;
    Error.error.StatusCode = error.StatusCode;

    return res.status(error.StatusCode).json(Error);
  }
}

async function getAllFlights(req, res, next) {
  try {
    const foundFlights = await FlightService.getFlights(req.query);

    const SuccessResponse = { ...Success,
      data: foundFlights
    };

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error,
      error: { message: error.message }
    };

    return res.status(200).json(ErrorResponse);
  }
}

async function getFlightById(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const RetrievedFlight = await FlightService.getFlightById(id);

    const SuccessResponse = {
      ...Success,
      message: "Flight found!",
      data: RetrievedFlight
    };
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error,
      error: { message: error.message }
    };
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function updateFlight(req, res, next) {
  const id = parseInt(req.params.id);

  const allowedUpdates = ['flightNumber', 'airplaneId', 'departureAirportCode', 'arrivalAirportCode', 'departureTime', 'arrivalTime', 'Fare', 'boardingGate'];
  let updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });


  try {
    const updatedFlight = await FlightService.updateFlight(id, updates);
    const SuccessResponse = { ...Success }
    SuccessResponse.message = "Flight updated successfully!";
    SuccessResponse.data = updatedFlight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse = { ...Error }
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function updateSeats(req, res, next){
  const id = parseInt(req.params.flightId)
  const decrement = req.query.decrement === '0'? false : true;

  /// calling the CustomFilter Class to create seatSelection object for based on travelClass selection
  const seatSelection = new CustomFilter(req.query).buildFilterObject();

  try {
    const Response = await FlightService.updateAvailableSeats(id, seatSelection.travelClass, decrement)
    // const SuccessResponse = { ...Success }
    // console.log(Success)
    // SuccessResponse.data = Response;
    console.log(Success)
    return res.status(StatusCodes.OK).json(Response)
  } catch (error) {
    ErrorResponse = { ...Error }
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  updateSeats
};