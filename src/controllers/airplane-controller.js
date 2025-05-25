const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");

async function createAirplane(req, res, next) {
  const { modelNo, modelName, capacity } = req.body;
  try {
    const response = await AirplaneService.createAirplane({
      modelNo,
      modelName,
      capacity,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "airplane is created with Model Number " + modelNo,
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      message: "Unable to create an Airplane with Model Number " + modelNo,
      data: {},
      error,
    });
  }
}

module.exports = {
  createAirplane,
};
