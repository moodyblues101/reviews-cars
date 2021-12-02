"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findCarById } = require("../../repositories/cars-repository");
const { findReviewsByCarId } = require("../../repositories/reviews-repository");

const schema = Joi.number().positive().required();

async function getCarReviewsByCarId(req, res) {
  try {
    const { carId } = req.params;
    await schema.validateAsync(carId);
    const car = await findCarById(carId);
    if (!car) {
      throwJsonError(400, "El coche no existe");
    }
  } catch (error) {
    createJsonError(error, res);
  }
  const reviews = await findReviewsByCarId(carId);
  res.status(200);
  res.send(reviews);
}

module.exports = getCarReviewsByCarId;
