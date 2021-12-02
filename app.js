"use strict";

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const { PORT } = process.env;
// Para poder subir ficheros/imagenes
app.use(fileUpload());
// Recibir datos como JSON en el body
app.use(express.json()); //su antiguo equivalente body parse
app.use(cors());
app.use(express.static("public"));

const carsRouter = require("./app/routes/cars-routes");
const usersRouter = require("./app/routes/users-routes");
//lamar middleware
// POST api/v1/cars/3/reviews
// POST api/v1/reviews {header}
app.use("/api/v1/cars/", carsRouter);
app.use("/api/v1/users/", usersRouter);

app.listen(PORT, () => console.log(`Running ${PORT}`));
