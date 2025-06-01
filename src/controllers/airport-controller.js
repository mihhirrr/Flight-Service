const { AirportService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");

async function createAirport(req, res, next) {
  const { Name, code, Address, cityID } = req.body;

  try {
    const createdAirport = await AirportService.createAirport({
      Name, code, Address, cityID
    });
    Success.message = "Airport created successfully";
    Success.data = createdAirport;
    return res.status(StatusCodes.CREATED).json(Success);
  } catch (error) {
    Error.message = "Unable to add an Airport";
    Error.error.message = error.message;
    Error.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(Error);
  }
}

async function updateAirport(req, res, next) {
  const id = parseInt(req.params.id);

  const allowedUpdates = ["Name", "code", "Address", "cityID"];
  let updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  try {
    const updatedAirport = await AirportService.updateAirport(id, updates);
    Success.message = "Airoprt updated successfully!";
    Success.data = updatedAirport;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    console.log(error);
    Error.error.message = error.message;
    Error.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(Error);
  }
}

async function deleteAirport(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const deletedAirport = await AirportService.deleteAirport(id);
    Success.message = "Airport deleted successfully!";
    Success.data = deletedAirport;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    Error.error.message = error.message;
    Error.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(Error);
  }
}

async function getAllAirports(req, res, next) {
  try {
    const getAllAirports = await AirportService.getAllAirports();
    Success.message = "Airports retrieved successfully!";
    Success.data = getAllAirports;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    Error.error.message = error.message;
    Error.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(Error);
  }
}

async function getAirportById(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const RetrievedAirport = await AirportService.getAirportById(id);
    Success.message = "Airport found!";
    Success.data = RetrievedAirport;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    Error.error.message = error.message;
    Error.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(Error);
  }
}

module.exports = {
  createAirport,
  updateAirport,
  deleteAirport,
  getAllAirports,
  getAirportById,
};
