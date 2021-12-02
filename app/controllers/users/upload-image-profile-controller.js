"use strict";

const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findUserById,
  uploadUserImage,
} = require("../../repositories/users-repository");
const { HTTTP_SERVER, PATH_USER_IMAGE } = process.env;

const validExtension = [".jpeg", ".jpg", ".png"];
async function uploadImageProfile(req, res) {
  try {
    // Obtenemos el id que venia en el JWT
    const { id } = req.auth;
    // Los ficheros/imagenes vienen en la cabecera req en el objeto files
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, "No se ha seleccionado ningún fichero");
    }
    // profileImage es el nombre de la variable que usamos en el postman
    const { profileImage } = files;
    console.log("profileImage", profileImage);
    const { name } = profileImage;
    const extension = path.extname(name);
    if (!validExtension.includes(extension)) {
      throwJsonError(400, "Formato no válido");
    }
    const user = await findUserById(id);
    const { image } = user;

    const pathProfileImage = `${__dirname}/../../../public/${PATH_USER_IMAGE}`;
    // Borramos el avatar original si existe
    if (image) {
      fs.unlink(`${pathProfileImage}/${image}`, () => {
        console.log("Imagne borrada correctamente");
      });
    }

    const randomName = randomstring.generate(10);
    const imageName = `${id}-${randomName}${extension}`;
    const pathImage = `${pathProfileImage}/${imageName}`;

    profileImage.mv(pathImage, async function (err) {
      if (err) throwJsonError(500, err.message);
      await uploadUserImage(id, imageName);

      res.status(201);
      res.send({ url: `${HTTTP_SERVER}/${PATH_USER_IMAGE}/${imageName}` });
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadImageProfile;
