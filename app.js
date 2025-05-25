const express = require("express");
const app = express();
const { PORT } = require("./src/config/server-config.js");
const { AirplaneRouter } = require("./src/routes");

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", AirplaneRouter);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
