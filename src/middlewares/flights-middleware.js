const StatusCodes = require('http-status-codes')
const { Error } = require('../utils/common-utils')

async function compareTime(req,res,next){
    //checking if the Airival time is greater that Departure Time while schedduling the flight
    if(new Date(req.body.arrivalTime) > new Date(req.body.departureTime)){
        next()
    }
    else{
        Error.error.message = 'Departure time should not be greater than Arrival time'
        res.status(StatusCodes.BAD_REQUEST).json(Error)
    }   
}

async function getFlightsValidation(req,res,next) {
    //checing if the Route, Passenger selection and Travel class provided
    if(!(req.query.route1 && req.query.passengerList &&  req.query.travelClass)){
        const ErrorResponse  = {...Error}
        ErrorResponse.error.message = 'Atleast one Trip, Travel class, number of travelers each required'
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }

    //checking if source and destination Airport are not same
    if(req.query.route1.split('-')[0] === req.query.route1.split('-')[1]){
        const ErrorResponse  = {...Error}
        ErrorResponse.error.message = 'Both Departure Airport and Arrival Airport cannot be same'
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    next()
}

module.exports = {
    compareTime,
    getFlightsValidation
}