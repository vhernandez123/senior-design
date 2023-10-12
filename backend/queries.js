const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv/config");

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "ROCKf13@",
  database: "PetLogger",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

function getAllPets(callback) {
  const sql = "SELECT * FROM mydb.pet";
  db.query(sql, callback);
}

function insertPet(petData, callback) {
  const sql =
    "INSERT INTO mydb.pet (petName, petBreed, petAge, petColor, petWeight, petMicrochipNum, petFood) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    petData.petName,
    petData.petBreed,
    petData.petAge,
    petData.petColor,
    petData.petWeight,
    petData.petMicrochipNum,
    petData.petFood,
  ];
  db.query(sql, values, callback);
}

module.exports = {
  getAllPets,
  insertPet,
};
