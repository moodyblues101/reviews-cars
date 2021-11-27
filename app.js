"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;
// Recibir datos como JSON en el body
app.use(express.json()); //su antiguo equivalente body parse

const carsRouter = require("./app/routes/cars-routes");
const usersRouter = require("./app/routes/users-routes");
//lamar middleware
app.use("/api/v1/cars/", carsRouter);
app.use("/api/v1/users/", usersRouter);

app.listen(PORT, () => console.log(`Running ${PORT}`));
