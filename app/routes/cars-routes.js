"use strict";

const express = require("express");
const router = express.Router();
const getCars = require("../controllers/cars/get-cars-controller");
const getCarById = require("../controllers/cars/get-car-by-id-controller");
const createReviewByCarId = require("../controllers/cars/create-review-by-car-id");
const getReviewsByCarId = require("../controllers/cars/get-reviews-by-car-id");
const getAvarageRatingByCarId = require("../controllers/cars/get-avarage-rating-by-car-id-controller");
const uploadCarImageById = require("../controllers/cars/upload-car-image-by-id-controller");
const validateAuth = require("../middlewares/validate-auth");

// Endpoints públicos
router.route("/").get(getCars);
router.route("/:id").get(getCarById);
router.route("/:carId/reviews").get(getReviewsByCarId);
router.route("/:carId/rating").get(getAvarageRatingByCarId);
// Endpoints privados
router
  .route("/:carId/reviews")
  .get() // El get no tiene validación al estar antes de .all(validateAuth)
  .all(validateAuth)
  .post(createReviewByCarId);
router.route("/:carid/images").all(validateAuth).post(uploadCarImageById);
module.exports = router;
