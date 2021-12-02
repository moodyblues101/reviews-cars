"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");

const schema = Joi.number().positive().integer().required();

async function uploadCarImageById(req, res) {
  try {
    const { carId } = req.params;
    // Validamos el carId
    await schema.validateAsync(carId);
    const { role } = req.auth;
    isAdmin();

    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No se ha seleccionado ningún fichero");
    }
    const { imageCar } = files;
    if (!imageCar) {
      throwJsonError(400, "Fichero subido no válido");
    }

    if (!imageCar.mimetype.startsWith("image")) {
      throwJsonError(400, "Formato no válido");
    }
    const { PATHS_CARS_IMAGE } = process.env;
    await uploadCarImageById({
      imageData: imageCar.data,
      destination: `${PATH_CARS_IMAGE}/${carId}`,
      width: 300,
      height: 300,
      codImage: carId,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.epxorts = uploadCarImageById;
