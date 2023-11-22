const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const crypto = require('crypto');
require("dotenv/config");
require('dotenv').config({ path: '../.env' });

const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
const initializationVector = Buffer.from(process.env.IV, 'hex');

function toEncrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, initializationVector);
  let encrypt = cipher.update(text, 'utf-8', 'hex');
  encrypt += cipher.final('hex');
  return encrypt;
}
function toDecrypt(text) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, initializationVector);
  let decrypt = decipher.update(text, 'hex', 'utf-8');
  decrypt += decipher.final('utf-8');
  return decrypt;
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

function getAllPets(callback) {
  const sql = "SELECT * FROM Pet";
  db.query(sql, callback);
}

function insertPet(petData, callback) {
  const sql =
    "INSERT INTO Pet (petName, petBreed, petAge, petColor, petWeight, petMicrochipNum, petFood, Owner_ownerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    petData.petName,
    petData.petBreed,
    petData.petAge,
    petData.petColor,
    petData.petWeight,
    petData.petMicrochipNum,
    petData.petFood,
    // petData.Owner_ownerId = 1,
    petData.Owner_ownerId,
  ];
  for (let i = 0; i+1 < values.length; i++) {
    values[i] = toEncrypt(values[i]);
  }
  db.query(sql, values, callback);
}

function getAllUsers(callback) {
  const query = "SELECT userId, userFirstName, userLastName FROM User where userId=1";
  db.query(query, callback);
}
function removePet(petId, callback) {
  const sql = "DELETE FROM Pet WHERE petId = ?";
  petId=toEncrypt(petId);
  db.query(sql, petId, callback);
}

module.exports = {
  getAllPets,
  insertPet,
  getAllUsers,
  removePet,
  toEncrypt,
  toDecrypt
};