"use strict";

const randomstring = require("randomstring");
const path = require("path");
const sharp = require("sharp");
const { ensureDir } = require("fs-extra");
const uploadImageProfile = require("../controllers/users/upload-image-profile-controller");

async function uploadImage(imageCar) {
  const { image, destination, width, height, codImage } = imageCar;
}

module.exports = uploadImage;
