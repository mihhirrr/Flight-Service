const express = require("express");
const app = express();
const ServerConfig = require("./src/config/server-config.js");
const { AirplaneRouter, CityRouter } = require("./src/routes");

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/airplanes", AirplaneRouter);
app.use("/api/cities", CityRouter);

app.listen(ServerConfig.PORT, () => {
  console.log("Server is listening on port " + ServerConfig.PORT);
});
