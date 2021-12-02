"use strict";
const { restart } = require("nodemon");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findAllUser,
  findAllUsers,
} = require("../../repositories/users-repository");

async function getUsers(req, res) {
  try {
    const { role } = req.auth;
    if (role !== "admin") {
      throwJsonError(401, "No tienes permisos para realizar esta acción");
    }
    const users = await findAllUsers();
    res.status(200);
    res.send({ data: users });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUsers;
