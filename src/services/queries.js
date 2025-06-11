//Seperating the row lock
function lockAirplaneTable(airplaneId){
        return `SELECT * FROM airplanes WHERE id = ${airplaneId} FOR UPDATE`
}

function lockFlightsTable(flightId){
        return  `SELECT * FROM flights WHERE id = ${flightId} FOR UPDATE`
}

module.exports = {
        lockAirplaneTable,
        lockFlightsTable
}