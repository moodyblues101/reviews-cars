"use strict";
const Joi = require("Joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
// const { createJsonerror, throwJsonError }
const {
  createUser,
  findUserByEmail,
} = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  verifyPassword: Joi.ref("password"),
});

async function registerUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { name, email, password } = body;
    const user = await findUserByEmail(email);
    if (user) {
      //   const error = new Error("Ya esxiste un usuario con ese email");
      //   error.status = 400; // 409 - Conflict
      //   throw error;
      //   Este código de arriba se reeemplaza por una  funcion
      throwJsonError(400, "Ya existe un usuario con ese email");
    }
    // Crear el hash del password
    // Crear el verificationCode
    // Crear un object user con los campos
    // Llamamos a la basse de datos - createUser
    // Enviar email de verificación de la cuenta :)
    // res.send()
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;
