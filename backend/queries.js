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

const getAllVets = (callback) => {
  const query =
    "SELECT vetinarianID, vetinarianName, vetinarianAddress FROM Vetinarian";
  db.query(query, callback);
};

function removePet(petId, callback) {
  const sql = "DELETE FROM Pet WHERE petId = ?";
  db.query(sql, petId, callback);
}

function getPetById(petId, callback) {
  const sql = "SELECT * FROM Pet WHERE petId = ?";
  db.query(sql, petId, callback);
}

function getUserbyId(userId, callback) {
  const sql = "SELECT * FROM User WHERE userId = ?";
  db.query(sql, userId, callback);
}
const getAllIllnesses = (callback) => {
  const query = "SELECT * FROM Illness";
  db.query(query, callback);
};

const getAllSymptoms = (callback) => {
  const query = "SELECT * FROM Symptoms";
  db.query(query, callback);
};

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
function insertPetHasIllness(petHasIllnessData, callback) {
  const petIllnessSql =
    "INSERT INTO Pet_has_Illness (Pet_petId, Illness_illnessId, dateOfDiagnosis, symptoms, Vetinarian_vetinarianID) VALUES (?, ?, ?, ?, ?)";
  const petIllnessValues = [
    petHasIllnessData.Pet_petId,
    petHasIllnessData.Illness_illnessId,
    petHasIllnessData.dateOfDiagnosis,
    petHasIllnessData.symptoms,
    petHasIllnessData.Vetinarian_vetinarianID,
  ];

  db.query(petIllnessSql, petIllnessValues, callback);
}

function getIllnessLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Pet_has_Illness WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
}

module.exports = {
  getAllPets,
  getAllSymptoms,
  insertPetHasIllness,
  getAllIllnesses,
  getAllVets,
  insertPet,
  getAllUsers,
  getLogsByPetId,
  getIllnessLogsByPetId,
  removePet,
  getPetById,
  getUserbyId,
  insertLog,
};
