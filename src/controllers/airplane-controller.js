const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");

async function createAirplane(req, res, next) {
  const { ModelNo, Capacity } = req.body;
  console.log(ModelNo, Capacity);
  try {
    const createdAirplane = await AirplaneService.createAirplane({
      ModelNo,
      Capacity,
    });
    Success.message = "Airplane created successfully";
    Success.data = createdAirplane;
    return res.status(StatusCodes.CREATED).json(Success);
  } catch (error) {
    Error.message = "Unable to add an Airplane";
    Error.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
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
    const updatedAirplane = await AirplaneService.updateAirplane(id, updates);
    Success.message = "Airplane updated successfully!";
    Success.data = updatedAirplane;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    Error.message = "Unable to update the Airplane";
    Error.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
  }
}

async function deleteAirplane(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const deletedAirplane = await AirplaneService.deleteAirplane(id);
    Success.message = "Airplane deleted successfully!";
    Success.data = deletedAirplane;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    Error.message = "Unable to delete the airplane";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
  }
}

async function getAllAirplanes(req, res, next) {
  try {
    const getAllAirplanes = await AirplaneService.getAllAirplanes();
    Success.message = "Airplanes retrieved successfully!";
    Success.data = getAllAirplanes;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    Error.message = "Unable to retrieve Airplanes";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
  }
}

async function getAirplaneById(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const RetrievedAirplane = await AirplaneService.getAirplaneById(id);
    Success.message = "Airplane found!";
    Success.data = RetrievedAirplane;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    Error.message = "Unable to retrieve the Airplane";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(Error);
  }
}

module.exports = {
  createAirplane,
  updateAirplane,
  deleteAirplane,
  getAllAirplanes,
  getAirplaneById,
};
