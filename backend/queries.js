const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv/config");
require("dotenv").config({ path: "../.env" });

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
  const sql = `INSERT INTO Pet (
      petName, 
      petBreed, 
      petGender, 
      petAge, 
      petColor, 
      petWeight, 
      petMicrochipNum, 
      User_userID) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
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
  for (let i = 0; i + 1 < values.length; i++) {
    values[i] = toEncrypt(values[i]);
  }
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


function insertLog(logData, callback) {
  const sql = `INSERT INTO Logs (
      logDate, 
      logEntry, 
      Pet_petID, 
      Pet_User_userID) 
      VALUES (?, ?, ?, ?)`;
  const values = [
    logData.logDate,
    logData.logEntry,
    logData.Pet_petID,
    logData.userId,
  ];
  for (let i = 0; i+2 < values.length; i++) {
    values[i] = toEncrypt(values[i]);
  }
  db.query(sql, values, callback);
}

function removeLog(logId, callback) {
  const sql = "DELETE FROM Logs WHERE logsID = ?";
  db.query(sql, logId, callback);
}

function getLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Logs WHERE Pet_petID = ?";
  db.query(sql, petId, callback);
}

function getLogById(logsID, callback) {
  const sql = "SELECT * FROM Logs WHERE logsID = ?";
  db.query(sql, logsID, callback);
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
  for (let i = 0; i+3 < values.length; i++) {
    values[i] = toEncrypt(values[i]);
  }
  db.query(sql, values, callback);
}

function getFoodDetailsbyLogID(logID, callback) {
  const sql = "SELECT * FROM Food WHERE Logs_logsID = ?";
  db.query(sql, logID, callback);
}

function getFoodDetailsbyLogs_Pet_petID(Logs_Pet_petID, callback) {
  const sql = "SELECT * FROM Food WHERE Logs_Pet_petID = ?";
  db.query(sql, Logs_Pet_petID, callback);
}

function getBehaviorDetailsbyLogs_Pet_petID(Logs_Pet_petID, callback) {
  const sql = "SELECT * FROM Behavior WHERE Logs_Pet_petID = ?";
  db.query(sql, Logs_Pet_petID, callback);
}
function getBehaviorDetailsbyLogID(logID, callback) {
  const sql = "SELECT * FROM Behavior WHERE Logs_logsID = ?";
  db.query(sql, logID, callback);
}

function getBathroomDetailsbyLogs_Pet_petID(Logs_Pet_petID, callback) {
  const sql = "SELECT * FROM Bathroom WHERE Logs_Pet_petID = ?";
  db.query(sql, Logs_Pet_petID, callback);
}

function getBathroomDetailsbyLogID(logID, callback) {
  const sql = "SELECT * FROM Bathroom WHERE Logs_logsID = ?";
  db.query(sql, logID, callback);
}

function getMedicationDetailsbyLogs_Pet_petID(Logs_Pet_petID, callback) {
  const sql = "SELECT * FROM Medication WHERE Logs_Pet_petID = ?";
  db.query(sql, Logs_Pet_petID, callback);
}

function getMedicationDetailsbyLogID(logID, callback) {
  const sql = "SELECT * FROM Medication WHERE Logs_logsID = ?";
  db.query(sql, logID, callback);
}

function getMedicationLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Pet_has_Medication WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
}

function insertBathroomData(bathroomData, callback) {
  const bathroomSql =
    `INSERT INTO Bathroom ( 
      bathroomNumber, 
      bathroomPoop, 
      bathroomUrine, 
      bathroomVomit, 
      Logs_logsID, 
      Logs_Pet_petID, 
      Logs_Pet_User_userID) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const bathroomValues = [
    bathroomData.bathroomNumber,
    bathroomData.bathroomPoop,
    bathroomData.bathroomUrine,
    bathroomData.bathroomVomit,
    bathroomData.Logs_logsID,
    bathroomData.Logs_Pet_petID,
    bathroomData.Logs_Pet_User_userID,
  ];
  for (let i = 0; i+3 < bathroomValues.length; i++) {
    bathroomValues[i] = toEncrypt(bathroomValues[i]);
  }
  db.query(bathroomSql, bathroomValues, callback);
}
function insertPetBehavior(behaviorData, callback) {
  const behaviorSql =
    "INSERT INTO Behavior ( behaviorActivity, behaviorAggression, behaviorChanges, Logs_logsID, Logs_Pet_petID, Logs_Pet_User_userID) VALUES ( ?, ?, ?, ?, ?, ?)";
  const behaviorValues = [
    behaviorData.activity,
    behaviorData.aggression,
    behaviorData.behaviorChanges,
    behaviorData.Logs_logsID,
    behaviorData.Logs_Pet_petID,
    behaviorData.Logs_Pet_User_userID,
  ];
  for (let i = 0; i+3 < behaviorValues.length; i++) {
    behaviorValues[i] = toEncrypt(behaviorValues[i]);
  }
  db.query(behaviorSql, behaviorValues, callback);
}

function insertPetMedication(medicationData, callback) {
  const medicationSql = `
    INSERT INTO Medication (
      medicationName,
      medicationDosage,
      medicationDuration,
      medicationInstructions,
      medicationVet,
      Logs_logsID,
      Logs_Pet_petID,
      Logs_Pet_User_userID
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const medicationValues = [
    medicationData.name,
    medicationData.dosage,
    medicationData.duration,
    medicationData.instruction,
    medicationData.vet,
    medicationData.Logs_logsID,
    medicationData.Logs_Pet_petID,
    medicationData.Logs_Pet_User_userID,
  ];
  for (let i = 0; i+3 < medicationValues.length; i++) {
    medicationValues[i] = toEncrypt(medicationValues[i]);
  }
  db.query(medicationSql, medicationValues, callback);
}



function getBehaviorLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Behavior WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
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
  insertBathroomData,
  insertPet,
  getLogsByPetId,
  removePet,
  insertLog,
  toEncrypt,
  toDecrypt,
  getBathroomDetailsbyLogs_Pet_petID,
  getMedicationDetailsbyLogs_Pet_petID,
  getBehaviorDetailsbyLogs_Pet_petID,
  getFoodDetailsbyLogs_Pet_petID,
  getBathroomDetailsbyLogID,
  getMedicationDetailsbyLogID,
  getBehaviorDetailsbyLogID,
  getFoodDetailsbyLogID,
};
