"use strict";

const { func } = require("joi");
const getPool = require("../infrastructure/database");

async function createUser(user) {
  const pool = await getPool();
  const sql = `
    INSERT INTO users(
        name, email, password, verificationCode, role,
        createdAt
    ) VALUES (?, ?, ?, ?, ?, ?)
    `;
  const { name, email, passwordHash, verificationCode } = user;
  const now = new Date();
  const [created] = await pool.query(sql, [
    name,
    email,
    passwordHash,
    verificationCode,
    "reader",
    now,
  ]);
  console.log("created", created);

  return created.insertId;
}

async function findUserByEmail(email) {
  const pool = await getPool();
  const sql =
    "SELECT id, name, email, password, role, verifiedAt FROM users WHERE email = ?";
  const [user] = await pool.query(sql, email);

  return user[0];
}
async function findUserById(id) {
  const pool = await getPool();
  const sql =
    "SELECT id, name, email, image, role, createdAt FROM users WHERE id = ?";

  const [user] = await pool.query(sql, id);

  return user[0];
}

async function activateUser(verificationCode) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
    UPDATE users
    SET verifiedAt = ?
    WHERE verificationCode = ?
    AND verifiedAt IS NULL
  `;
  const [result] = await pool.query(sql, [now, verificationCode]);
  return result.affectedRows === 1;
}
async function getUserByVerificationCode(code) {
  const pool = await getPool();
  const sql = `
    SELECT name, email
    FROM users WHERE verificationCode = ?
  `;
  const [user] = await pool.query(sql, code);

  return user[0];
}
async function findAllUsers() {
  const pool = await getPool();
  const sql = "SELECT id, name, email, verifiedAt FROM users";
  const [users] = await pool.query(sql);

  return users;
}

async function removeUserById(id) {
  const pool = await getPool();
  const sql = "DELETE FORM users WHERE id = ?";
  await pool.query(sql, id);

  return true;
}

async function uploadUserImage(id, image) {
  const pool = await getPool();
  const sql = "UPDATE users SET image = ? WHERE id = ?";
  await pool.query(sql, [image, id]);

  return true;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  activateUser,
  getUserByVerificationCode,
  findAllUsers,
  removeUserById,
  uploadUserImage,
};
