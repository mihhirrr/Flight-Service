const { SeatRepository } = require('../repositories')
const db = require('../models')
const { Op } = require('sequelize')

const seatRepository = new SeatRepository()

async function udpateSeatStatus(seats, BookingId, status){
      
      const t = await db.sequelize.transaction();

      try {
            const data = { status, BookingId }
            const seatIds = { id: {
            [Op.in]: seats,
            }}

            await seatRepository.update(data, seatIds, t)

            t.commit()
            return 'Seats Booked!'

      } catch (error) {

            t.rollback();
            throw error
      }
}

module.exports = {      
      udpateSeatStatus
}