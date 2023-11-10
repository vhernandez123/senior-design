const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv/config");

const db = mysql.createConnection({
  user: "admin",
  host: "pet-app-4160.cdfommd6aile.us-east-1.rds.amazonaws.com",
  password: "4160Seniordesign",
  database: "mydb",
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
    petData.Owner_ownerId,
  ];
  db.query(sql, values, callback);
}

function getAllUsers(callback) {
  const query = "SELECT userId, userFirstName, userLastName FROM User";
  db.query(query, callback);
}
function removePet(petId, callback) {
  const sql = "DELETE FROM Pet WHERE petId = ?";
  db.query(sql, petId, callback);
}

function getPetById(petId, callback) {
  const sql = "SELECT * FROM Pet WHERE petId = ?";
  db.query(sql, petId, callback);
}

function insertLog(logData, callback) {
  const sql =
    "INSERT INTO Logs (logDate, logEntry, Pet_petId, logFood) VALUES (?, ?, ?, ?)";
  const values = [
    logData.logDate,
    logData.logEntry,
    logData.Pet_petId,
    logData.logFood,
  ];
  db.query(sql, values, callback);
}
function getLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Logs WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
}
function insertIllness(illnessData, callback) {
  const sql = "INSERT INTO Illness (illnessName) VALUES (?)";
  const values = [illnessData.illnessName];
  db.query(sql, values, (error, results) => {
    if (error) {
      callback(error);
    } else {
      const illnessId = results.insertId;
      const petIllnessSql =
        "INSERT INTO Pet_has_Illness (Pet_petId, Illness_illnessId, dateOfDiagnosis, symptoms, Vetinarian_vetinarianID) VALUES (?, ?, ?, ?, ?)";
      const petIllnessValues = [
        illnessData.Pet_petId,
        illnessId,
        illnessData.dateOfDiagnosis,
        illnessData.symptoms,
        illnessData.Vetinarian_vetinarianID,
      ];
      db.query(petIllnessSql, petIllnessValues, callback);
    }
  });
}

module.exports = {
  getAllPets,
  insertPet,
  getAllUsers,
  getLogsByPetId,
  removePet,
  getPetById,
  insertIllness,
  insertLog,
};
