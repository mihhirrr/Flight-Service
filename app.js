const express = require("express");
const app = express();
const { PORT } = require("./src/config/server-config.js");

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
