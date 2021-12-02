"use strict";

const throwJsonError = require("../errors/throw-json-error");

function isAdmin(role) {
  if (role !== "admin") {
    throwJsonError(401, "No tienes permisos para realizar esta acción");
  }
  return true;
}

module.exports = {
  isAdmin,
};
