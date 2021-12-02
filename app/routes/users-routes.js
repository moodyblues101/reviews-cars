"use strict";

const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/users/register-user-controller");
const validateUser = require("../controllers/users/activate-user-controller");
const loginUser = require("../controllers/users/login-user-controller");
const getUsers = require("../controllers/users/get-users-controller");
const getUserProfile = require("../controllers/users/get-user-profile-controller");
const validateAuth = require("../middlewares/validate-auth");
const deleteUserById = require("../controllers/users/delete-user-by-id-controller");
const uploadImageProfile = require("../controllers/users/upload-image-profile-controller");

// ALL URLs begin with /api/v1/users...
router.route("/").post(registerUser);
router.route("/activation").get(validateUser);
router.route("/login").post(loginUser);

//PRIVADAS
router.route("/").all(validateAuth).get(getUsers);
router.route("/:id").all(validateAuth).delete(deleteUserById);
router.route("/profile").all(validateAuth).get(getUserProfile);
router.route("/upload").all(validateAuth).post(uploadImageProfile);

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
// DELETE api/v1/users/:id <== Solo el admin
