"use strict";
const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { removeUserById } = require("../../repositories/users-repository");
const { isAdmin } = require("../../helpers/utils");
const { isSchema } = require("joi");

const schema = Joi.number().positive().required();

async function deleteUserById(req, res) {
  try {
    const { role } = req.auth; // En el req.auth tenemos {id, name, role}
    isAdmin(role);
    // DELETE /api/v1/users/'id'
    const { id } = req.params;
    await schema.validateAsync(id);
    // Obtenemos el ususario a borrar
    const user = await finsUserById(id);
    if (!user) {
      throwJsonError(400, "Usuario no existe");
    }
    if (user.role === "admin") {
      throwJsonError(403, "No tienes permisos para realizar eta acción");
    }
    await removeUserById(id);

    res.status(204).send();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteUserById;
