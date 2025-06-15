const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");

async function createAirplane(req, res, next) {
  const { ModelNo, Capacity } = req.body;

  try {
    const createdAirplane = await AirplaneService.createAirplane({
      ModelNo,
      Capacity,
    });
    const SuccessResponse = { ...Success }
    SuccessResponse.message = "Airplane created successfully";
    SuccessResponse.data = createdAirplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error }
    ErrorResponse.message = "Unable to add an Airplane";
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function updateAirplane(req, res, next) {
  const id = parseInt(req.params.id);

  const allowedUpdates = ["ModelNo", "Capacity"];
  let updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  try {
    await AirplaneService.updateAirplane(id, updates);
    const SuccessResponse = { ...Success }
    SuccessResponse.message = "Airplane updated successfully!";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error }
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(ErrorResponse); 
  }
}

async function deleteAirplane(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const deletedAirplane = await AirplaneService.deleteAirplane(id);
    const SuccessResponse = { ...Success }
    SuccessResponse.message = "Airplane deleted successfully!";
    SuccessResponse.data = deletedAirplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error }
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function getAllAirplanes(req, res, next) {
  try {
    const getAllAirplanes = await AirplaneService.getAllAirplanes();
    const SuccessResponse = { ...Success }
    SuccessResponse.message = "Airplanes retrieved successfully!";
    SuccessResponse.data = getAllAirplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error }
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function getAirplaneById(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const RetrievedAirplane = await AirplaneService.getAirplaneById(id);
    const SuccessResponse = { ...Success }
    SuccessResponse.message = "Airplane found!";
    SuccessResponse.data = RetrievedAirplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error }
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  updateAirplane,
  deleteAirplane,
  getAllAirplanes,
  getAirplaneById,
};
