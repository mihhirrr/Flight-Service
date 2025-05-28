const { CityService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");

async function createCity(req, res, next) {
    const { Name } = req.body;

    try {
        const createdCity = await CityService.createCity({Name});
        Success.message = "City created successfully";
        Success.data = createdCity;
        return res.status(StatusCodes.CREATED).json(Success);
    } catch (error) {
        Error.message = "Unable to add a city"; 
        Error.error.message = error.message;    
        Error.error.StatusCode = error.StatusCode;
        return res.status(error.StatusCode).json(Error);
    }
}

async function updateCity(req, res, next) {
    const id = parseInt(req.params.id);
    const { Name } = req.body;

    try {   
        const updatedCity = await CityService.updateCity(id, {Name});
        Success.message = "City updated successfully";
        Success.data = updatedCity;
        return res.status(StatusCodes.OK).json(Success);
    } catch (error) {
        Error.message = "Unable to update a city";
        Error.error.message = error.message;
        Error.error.StatusCode = error.StatusCode;
        return res.status(error.StatusCode).json(Error);
    }
}

async function deleteCity(req, res, next) {
    const id = parseInt(req.params.id);

    try {
        const deletedCity = await CityService.deleteCity(id);
        Success.message = "City deleted successfully";
        Success.data = deletedCity;
        return res.status(StatusCodes.OK).json(Success);
    } catch (error) {
        Error.message = "Unable to delete a city";
        Error.error.message = error.message;
        Error.error.StatusCode = error.StatusCode;
        return res.status(error.StatusCode).json(Error);
    }
}

async function getAllCities(req, res, next) {
    try {
        const getAllCities = await CityService.getAllCities();
        Success.message = "Cities fetched successfully";
        Success.data = getAllCities;
        return res.status(StatusCodes.OK).json(Success);
    } catch (error) {
        Error.message = "Unable to fetch cities";
        Error.error.message = error.message;
        Error.error.StatusCode = error.StatusCode;
        console.log(error);
        return res.status(error.StatusCode).json(Error);
    }
}

async function getCityById(req, res, next) {
    const id = parseInt(req.params.id);

    try {
        const getCityById = await CityService.getCityById(id);
        Success.message = "City fetched successfully";
        Success.data = getCityById;
        return res.status(StatusCodes.OK).json(Success);
    } catch (error) {
        Error.message = "Unable to fetch a city";
        Error.error.message = error.message;
        Error.error.StatusCode = error.StatusCode;
        return res.status(error.StatusCode).json(Error);
    }
}

module.exports = {
    createCity,
    updateCity,
    deleteCity,
    getAllCities,
    getCityById
}
