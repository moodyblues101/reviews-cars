"use strict";

const { query } = require("express");
const getPool = require("../infrastructure/database");

async function addReview(idUser, idCar, comment, rating) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
    INSERT INTO reviews (idUser, idCar, comment, rating, createdAt)
    VALUES (?, ?, ?, ?, ?)
    `;
  const [reviews] = await pool.query(sql, [idUser, idCar, comment.rating, now]);

  return reviews.insertId;
}
async function findReviewsByCarId(idCar) {
  const pool = await getPool();
  const sql = "SELECT * FROM reviews WHERE idCar = ?";
  const [reviews] = await pool.query(sql, idCar);

  return reviews;
}

async function getRating(idCar) {
  const pool = await getPool();
  const sql = "SELECT AVG(rating) as media FROM reviews WHERE idCar = ?";
  const [reviews] = await pool.query(sql, idCar);

  return reviews[0];
}

module.exports = {
  addReview,
  findReviewsByCarId,
  getRating,
};
