const StatusCodes = require('http-status-codes')
const { Error } = require('../utils/common-utils')

async function compareTime(req,res,next){
        if(new Date(req.body.arrivalTime) > new Date(req.body.departureTime)){
            next()
        }
        else{
            Error.error.message = 'Departure time should not be greater than Arrival time'
            res.status(StatusCodes.BAD_REQUEST).json(Error)
        }
}

async function getFlightsValidation(req,res,next) {
    if(!(req.query.route1 && req.query.passengerList &&  req.query.travelClass)){
        const ErrorResponse  = {...Error}
        ErrorResponse.error.message = 'Atleast one Trip, Travel class, number of travelers each required'
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    next()
}

module.exports = {
    compareTime,
    getFlightsValidation
}