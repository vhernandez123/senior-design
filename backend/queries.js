const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv/config");
require("dotenv").config({ path: "../.env" });

// encryption/decryption
const secretKey = Buffer.from(process.env.SECRET_KEY, "hex");
const initializationVector = Buffer.from(process.env.IV, "hex");

function toEncrypt(text) {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    secretKey,
    initializationVector
  );
  let encrypt = cipher.update(text, "utf-8", "hex");
  encrypt += cipher.final("hex");
  return encrypt;
}
function toDecrypt(text) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    secretKey,
    initializationVector
  );
  let decrypt = decipher.update(text, "hex", "utf-8");
  decrypt += decipher.final("utf-8");
  return decrypt;
}

// const db = mysql.createConnection({
//   user: "admin",
//   host: "pet-app-4160.cdfommd6aile.us-east-1.rds.amazonaws.com",
//   password: "4160Seniordesign",
//   database: "mydb",
// });

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

function getAllPetsbyID(userID, callback) {
  const sql = "SELECT * FROM Pet WHERE User_userID = ?";
  const values = userID;
  db.query(sql, values, callback);
}

function getPetById(petID, callback) {
  const sql = "SELECT * FROM Pet WHERE petID = ?";
  db.query(sql, petID, callback);
}

function insertPet(petData, callback) {
  const sql =
    "INSERT INTO Pet (petName, petBreed, petGender, petAge, petColor, petWeight, petMicrochipNum, User_userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    petData.petName,
    petData.petBreed,
    petData.petGender,
    petData.petAge,
    petData.petColor,
    petData.petWeight,
    petData.petMicrochipNum,
    petData.Owner_ownerId,
  ];
  db.query(sql, values, callback);
}

function removePet(petID, callback) {
  const sql = "DELETE FROM Pet WHERE petID = ?";
  db.query(sql, petID, callback);
}

function getUserbyId(userId, callback) {
  const sql = "SELECT * FROM User WHERE userId = ?";
  db.query(sql, userId, callback);
}

const getAllIllnesses = (callback) => {
  const query =
    "SELECT * FROM Illness WHERE (Logs_logsID = ? AND Logs_Pet_petID = ? AND Logs_Pet_User_userID = ?)";
  db.query(query, callback);
};

function insertLog(logData, userId, callback) {
  const sql =
    "INSERT INTO Logs (logDate, logEntry, Pet_petID, Pet_User_userID) VALUES (?, ?, ?, ?)";
  const values = [logData.logDate, logData.logEntry, logData.Pet_petID, userId];
  db.query(sql, values, callback);
}

function insertFood(foodData, callback) {
  const sql = `
    INSERT INTO Food (
      foodType, 
      foodAmount, 
      foodUnit, 
      foodWater, 
      foodDanger, 
      foodDangerDescription, 
      Logs_logsID, 
      Logs_Pet_petID, 
      Logs_Pet_User_userID
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    foodData.foodType,
    foodData.foodAmount,
    foodData.foodUnit,
    foodData.foodWater,
    foodData.foodDanger,
    foodData.foodDangerDescription,
    foodData.Logs_logsID,
    foodData.Logs_Pet_petID,
    foodData.Logs_Pet_User_userID,
  ];

  db.query(sql, values, callback);
}

function getLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Logs WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
}

function getMedicationLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Pet_has_Medication WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
}

function insertPetHasIllness(petHasIllnessData, callback) {
  const petIllnessSql =
    "INSERT INTO Illness (Logs_logsID, Logs_Pet_petID, Logs_Pet_User_userID, illnessInitialDate, illnessDateOfDiagnosis, illnessSymptoms, illnessVet) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const petIllnessValues = [
    petHasIllnessData.logID,
    petHasIllnessData.petID,
    petHasIllnessData.userID,
    petHasIllnessData.illnessInitialDate,
    petHasIllnessData.illnessDateDiagnosis,
    petHasIllnessData.illnessSymptoms,
    petHasIllnessData.illnessVet,
  ];

  db.query(petIllnessSql, petIllnessValues, callback);
}

function insertPetBehavior(behaviorData, callback) {
  const behaviorSql =
    "INSERT INTO PetBehavior (Logs_logsID, Logs_Pet_petID, Logs_Pet_User_userID, behaviorActivity, behaviorAggression, behaviorChanges) VALUES (?, ?, ?, ?, ?, ?)";
  const behaviorValues = [
    behaviorData.logID,
    behaviorData.petID,
    behaviorData.userID,
    behaviorData.activity,
    behaviorData.aggression,
    behaviorData.behaviorChanges,
  ];

  db.query(behaviorSql, behaviorValues, callback);
}

function insertPetMedication(medicationData, callback) {
  const medicationSql =
    "INSERT INTO Pet_has_Medication (Logs_logsID, Logs_Pet_petID, Logs_Pet_User_userID, medicationName, medicationDosage, medicationDuration, medicationInstructions, medicationVet) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const medicationValues = [
    medicationData.logID,
    medicationData.petID,
    medicationData.userID,
    medicationData.name,
    medicationData.dosage,
    medicationData.duration,
    medicationData.instruction,
    medicationData.vet,
  ];

  db.query(medicationSql, medicationValues, callback);
}

function getIllnessLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Pet_has_Illness WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
}

function getBehaviorLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Behavior WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
}

function getLogById(logsID, callback) {
  const sql = "SELECT * FROM Logs WHERE logsID = ?";
  db.query(sql, logsID, callback);
}

function getMedications(callback) {
  const sql = "SELECT * FROM Medication";
  db.query(sql, callback);
}

module.exports = {
  getAllPetsbyID,
  getPetById,
  insertFood,
  getLogById,
  getUserbyId,
  insertPetMedication,
  getMedicationLogsByPetId,
  getMedications,
  insertPetBehavior,
  getBehaviorLogsByPetId,
  insertPetHasIllness,
  getAllIllnesses,
  insertPet,
  getLogsByPetId,
  getIllnessLogsByPetId,
  removePet,
  insertLog,
  toEncrypt,
  toDecrypt,
};
