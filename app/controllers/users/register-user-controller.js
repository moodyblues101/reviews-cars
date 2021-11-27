"use strict";
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
// const { createJsonerror, throwJsonError }
const {
  createUser,
  findUserByEmail,
} = require("../../repositories/users-repository");
const { sendMailRegister } = require("../../helpers/mail-smtp");

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  verifyPassword: Joi.ref("password"),
});

async function registerUser(req, res) {
  try {
    const { body } = req;
    console.log("body", body);
    await schema.validateAsync(body);
    const { name, email, password } = body;
    console.log("password", password);
    const user = await findUserByEmail(email);
    if (user) {
      //   const error = new Error("Ya esxiste un usuario con ese email");
      //   error.status = 400; // 409 - Conflict
      //   throw error;
      //   Este código de arriba se reeemplaza por una  funcion
      throwJsonError(400, "Ya existe un usuario con ese email");
    }
    // Crear el hash del password
    const passwordHash = await bcrypt.hash(password, 12);
    // Crear el verificationCode
    const verificationCode = randomstring.generate(64);
    // Crear un object user con los campos
    const userDB = { name, email, passwordHash, verificationCode };
    // Llamamos a la basse de datos - createUser
    const userId = await createUser(userDB);
    // Enviar email de verificación de la cuenta :)
    await sendMailRegister(name, email);
    // console.log(
    //   `http://localhost:3000/api/v1/users/activation?verificationCode=${verificationCode}`
    // );
    res.status(201);
    res.send({ id: userId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;
