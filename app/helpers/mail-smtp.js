"use strict";
const nodemailer = require("nodemailer");
const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function sendMailRegister(name, email, code) {
  // Generar el link de activación
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: "Welcome to ReviewsCars App",
    text: `Hi ${name}, to confirm account click`,
    html: `Hi ${name}, to confirm account click`,
  };
  const data = await transporter.sendMail(mailData);
  console.log("DATA", data);
  return data;
}

module.exports = {
  sendMailRegister,
};
