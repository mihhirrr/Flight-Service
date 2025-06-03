//example search filter object should look like


const searchFilter = {
    route1:{
        departureAirportCode:'DEL',
        arrivalAirportCode:'MUM'
    },
    // If there is
    route2:{
        departureAirportCode:'MUM',
        arrivalAirportCode:'BLR'
    }, 
    price:{
        minPrice: 3000,
        maxPrice: 18000
    },
    passengerList: {
        Adults: 2,
        Teens: 1,
    },
    travelClass: {
        economy: 3,
    }
}