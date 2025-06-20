const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");
const { CustomFilter }  = require('../utils/helpers')
const { data, message } = require("../utils/common-utils/success");
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

    const SuccessResponse = { ...Success ,
      message: "Flight scheduled successfully",
      data: createdFlight
    }

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
      const ErrorResponse = { ...Error , 
        message: "Unable to add Flight" , 
        error: { message: error.message }
      }

      return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function getAllFlights(req, res, next) {
  try {
    const foundFlights = await FlightService.getFlights(req.query);

    const SuccessResponse = { ...Success,
      message: 'Flights found!',
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
    const SuccessResponse = { ...Success ,
      message: "Flight updated successfully!",
      data: updatedFlight
    }
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {

    ErrorResponse = { ...Error ,
      error: { message: error.message , },
    }

    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function updateSeats(req, res, next){
  const id = parseInt(req.params.flightId)
  const decrement = req.query.decrement === '0'? false : true;

  /// calling the CustomFilter Class to create seatSelection object for based on travelClass selection
  const seatSelection = new CustomFilter(req.body).buildFilterObject();

  try {
    const Response = await FlightService.updateAvailableSeats(id, seatSelection.travelClass, decrement)
    const SuccessResponse = { ...Success , 
      data: Response
    }
    return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
    ErrorResponse = { ...Error , 
      error: { message: error.message }
    }
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