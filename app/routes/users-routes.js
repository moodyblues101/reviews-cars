"use strict";

const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/users/register-user-controller");
const validateUser = require("../controllers/users/activate-user-controller");
const loginUser = require("../controllers/users/login-user-controller");

router.route("/").post(registerUser);
router.route("/activation").get(validateUser);
router.route("/login").post(loginUser);

module.exports = router;
// Endpoint Públicos
// POST api/v1/users = registerUser
// POST api/v1/users/login
// GET api/v1/users/activation <?code= activar ususario
// Endpoint Privados
// GET api/v1/users <== solo admin
// GET api/v1/users/:id <== solo propietario
// PUT api/v1/users/:id
// PUT api/v1/users/:id/avatar
// DELETE api/v1/users/:id
