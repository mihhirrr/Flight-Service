const { AirplaneRepository } = require("../repositories");

const airplaneRepository = new AirplaneRepository();

const createAirplane = async (data) => {
  try {
    console.log(data);
    const createdAirplane = await airplaneRepository.create(data);
    return createdAirplane;
  } catch (error) {
    console.log("There was an error while creating the airplane");
    throw error;
  }
};

module.exports = {
  createAirplane,
};
