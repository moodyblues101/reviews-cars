"use strict";
const createJsonError = require("../../errors/create-json-error");
// REQUIRE funcion BD
// Schema Joi

async function nombreFuncion(req, res) {
  try {
    // VALIDACION PARAMETORS ENTRADA
    // LLAMADA BASE DE DATOS
    // VALIDAR RESULTADOS
    res.send();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = nombreFuncion;
