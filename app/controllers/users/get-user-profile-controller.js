"use strict";
const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findUserById } = require("../../repositories/users-repository");

async function getUserProfile(req, res) {
  try {
    const { id } = req.auth;
    const user = await findUserById(id);
    const { name, email, image, createdAt } = user;

    res.status(200).send({ user });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUserProfile;
