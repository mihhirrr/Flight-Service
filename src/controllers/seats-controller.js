const { SeatService } = require('../services')
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");

const { Enums } = require('../utils/common-utils')
const { BOOKED } = Enums.SeatStatus;

async function udpateSeats(req, res, next){
      const seats = req.body.seats;
      const BookingId = req.body.BookingId || null;
      const status = req.body.status || BOOKED;
 
      try {
            await SeatService.udpateSeatStatus(seats, BookingId, status);
            const SuccessResponse = { 
                  ...Success,
                  message: 'Seats Updated!',
            };
            res.status(StatusCodes.OK).json(SuccessResponse)
      } catch (error) {
            const ErrorResponse = { 
                  ...Error ,
                  error: { 
                  message: error.message , 
                  StatusCode: error.StatusCode }
            };
            return res.status(error.StatusCode || 500).json(ErrorResponse);
      }
}


module.exports = {
      udpateSeats
}