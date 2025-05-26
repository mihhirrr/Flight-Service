const { AirplaneRepository } = require("../repositories");

const airplaneRepository = new AirplaneRepository();

const createAirplane = async (data) => {
  try {
    const createdAirplane = await airplaneRepository.create(data);
    return createdAirplane;
  } catch (error) {
    console.log("There was an error while creating the airplane");
    throw error;
  }
};

const updateAirplane = async (id, data) => {
  try {
    const updatedAirplane = await airplaneRepository.update(id, data);
    return updatedAirplane;
  } catch (error) {
    console.log("There was an error while updating the airplane");
    throw error;
  }
};

const deleteAirplane = async (id) => {
  try {
    const deletedAirplane = await airplaneRepository.delete(id);
    return deletedAirplane;
  } catch (error) {
    console.log("There was an error while deleting the airplane");
    throw error;
  }
};

const getAllAirplanes = async () => {
  try {
    const getAllAirplanes = await airplaneRepository.findAll();
    return getAllAirplanes;
  } catch (error) {
    console.log("There was an error while retrieving the airplanes");
    throw error;
  }
};

const getAirplaneById = async (id) => {
  try {
    const RetrievedAirplane = await airplaneRepository.find(id);
    return RetrievedAirplane;
  } catch (error) {
    console.log("There was an error while retrieving the airplane");
    throw error;
  }
};

module.exports = {
  createAirplane,
  updateAirplane,
  deleteAirplane,
  getAllAirplanes,
  getAirplaneById,
};
