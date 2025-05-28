const { CityRepository } = require("../repositories");
const AppError = require("../utils/Error-handler/AppError");
const { StatusCodes } = require("http-status-codes");

const cityRepository = new CityRepository();

const createCity = async (data) => {
    try {
      const createdCity = await cityRepository.create(data);
      return createdCity;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      }
      console.log("There was an error while creating the airplane");
      throw error;
    }
  };

const updateCity = async (id, data) => {
    try {
      const updatedCity = await cityRepository.update(id, data);
      return updatedCity;
    } catch (error) {
      throw error;
    }
  };

  const deleteCity = async (id) => {
    try {
      const deletedCity = await cityRepository.delete(id);
      return deletedCity;
    } catch (error) {
      throw error;
    }
  };

const getAllCities = async () => {
    try {
        const getAllCities = await cityRepository.findAll();
        return getAllCities;
    } catch (error) {
        if(error.name == 'TypeError'){
            throw new AppError('Something went wrong!', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        throw error;

    }
}

const getCityById = async (id) => {
    try {
        const getCityById = await cityRepository.find(id);
        return getCityById;
    } catch (error) {
        throw error;
    }
}   



module.exports = {
    createCity,
    updateCity,
    deleteCity,
    getAllCities,
    getCityById
}
