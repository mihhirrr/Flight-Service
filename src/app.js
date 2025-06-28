const express = require("express");
const app = express();
const ServerConfig = require('./config/server-config.js');
const { AirplaneRouter, CityRouter, AirportRouter , FlightRouter, SeatsRouter} = require("./routes/index.js");
  
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/airplanes", AirplaneRouter);
app.use("/api/cities", CityRouter);
app.use("/api/airports", AirportRouter);
app.use("/api/flights", FlightRouter);
app.use("/api/seats", SeatsRouter)        // Working on Seats routes to update in case of booking confirmation / cancellation

app.listen(ServerConfig.PORT, async () => {
  console.log("Server is listening on port " + ServerConfig.PORT);
});