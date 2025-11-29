const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");

//test route->

async function getAirplaneRoute(req, res, next) {
  res.json({
        message:"Flight Service route is functional."
  })
}

//test route end ^^


async function createAirplane(req, res, next) {
  const { ModelNo, Capacity } = req.body;

  try {
    const createdAirplane = await AirplaneService.createAirplane({
      ModelNo,
      Capacity,
    });
    const SuccessResponse = { ...Success,
      message: "Airplane created successfully",
      data: createdAirplane
    }
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error,
      message: "Unable to add an Airplane",
      error: {
        message: error.message,
        StatusCode: error.StatusCode
      }
    }
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
    const SuccessResponse = { ...Success,
      message: "Airplane updated successfully!",
      data: updates
    }
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error,
      message: "Unable to update the Airplane",
      error: {
        message: error.message,
        StatusCode: error.StatusCode
      }
    }
    return res.status(error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse); 
  }
}

async function deleteAirplane(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const deletedAirplane = await AirplaneService.deleteAirplane(id);
    const SuccessResponse = { ...Success,
      message: "Airplane deleted successfully!",
      data: deletedAirplane
    }
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error,
      message: "Unable to delete the Airplane",
      error: {
        message: error.message,
        StatusCode: error.StatusCode
      }
    }
    return res.status(error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
  }
}

async function getAllAirplanes(req, res, next) {
  try {
    const getAllAirplanes = await AirplaneService.getAllAirplanes();
    const SuccessResponse = { ...Success,
      message: "Airplanes retrieved successfully!",
      data: getAllAirplanes
    }
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error,
      message: "Unable to retrieve the Airplanes",
      error: {
        message: error.message,
        StatusCode: error.StatusCode
      }
    }
    return res.status(error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
  }
}

async function getAirplaneById(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const RetrievedAirplane = await AirplaneService.getAirplaneById(id);
    const SuccessResponse = { ...Success,
      message: "Airplane found!",
      data: RetrievedAirplane
    }
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = { ...Error,
      message: "Unable to retrieve the Airplane",
      error: {
        message: error.message,
        StatusCode: error.StatusCode
      }
    }
    return res.status(error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  updateAirplane,
  deleteAirplane,
  getAllAirplanes,
  getAirplaneById,
  getAirplaneRoute
};
