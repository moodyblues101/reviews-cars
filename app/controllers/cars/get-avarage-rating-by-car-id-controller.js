"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findCarById } = require("../../repositories/cars-repository");
const { getRating } = require("../../repositories/reviews-repository");

const schema = Joi.number().positive().integer().required();
async function getAvarageRatingByCarId(req, res) {
  try {
    // Obtenemos el carId de la URL
    const { carId } = req.params;
    // Validamos el carId con JOI
    await schema.validateAsync(carId);
    // Comprobamos que el coche existe para ese carId
    const car = await findCarById(carId);
    if (!car) {
      throwJsonError(400, "Este coche no existe");
    }
    // Solución con 1 llamadas a la base de datos
    const rating = await getRating(carId);

    res.status(200);
    res.send(rating);
    // res.send({ rating, numValoraciones });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getAvarageRatingByCarId;
