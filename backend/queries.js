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
    "INSERT INTO Pet (petName, petBreed, petGender, petAge, petColor, petWeight, petMicrochipNum, petFood, Owner_ownerId) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    petData.petName,
    petData.petBreed,
    petData.petGender,
    petData.petAge,
    petData.petColor,
    petData.petWeight,
    petData.petMicrochipNum,
    petData.petFood,
    petData.Owner_ownerId,
  ];
  for (let i = 0; i+1 < values.length; i++) {
    values[i] = toEncrypt(values[i]);
  }
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

function getMedicationLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Pet_has_Medication WHERE Pet_petId = ?";
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

function insertPetBehavior(behaviorData, callback) {
  const behaviorSql =
    "INSERT INTO PetBehavior (Pet_petId, activity, aggression, behaviorChanges, Symptom_symptomId) VALUES (?, ?, ?, ?, ?)";
  const behaviorValues = [
    behaviorData.selectedPetId,
    behaviorData.activity,
    behaviorData.aggression,
    behaviorData.behaviorChanges,
    behaviorData.selectedSymptomId,
  ];

  db.query(behaviorSql, behaviorValues, callback);
}

function insertPetMedication(medicationData, callback) {
  const medicationSql =
    "INSERT INTO Pet_has_Medication (Pet_petId, Medication_medicationId, durationInDays, dosage, instructions, Vetinarian_vetinarianID) VALUES (?, ?, ?, ?, ?, ?)";
  const medicationValues = [
    medicationData.selectedPetId,
    medicationData.selectedMedicationId,
    medicationData.durationInDays,
    medicationData.dosage,
    medicationData.instructions,
    medicationData.selectedVetId,
  ];

  db.query(medicationSql, medicationValues, callback);
}

function getIllnessLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM Pet_has_Illness WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
}

function getBehaviorLogsByPetId(petId, callback) {
  const sql = "SELECT * FROM PetBehavior WHERE Pet_petId = ?";
  db.query(sql, petId, callback);
}

function getMedications(callback) {
  const sql = "SELECT * FROM Medication";
  db.query(sql, callback);
}

module.exports = {
  getAllPets,
  insertPetMedication,
  getMedicationLogsByPetId,
  getMedications,
  insertPetBehavior,
  getBehaviorLogsByPetId,
  getAllSymptoms,
  insertPetHasIllness,
  getAllIllnesses,
  getAllVets,
  insertPet,
  getAllUsers,
  getLogsByPetId,
  getIllnessLogsByPetId,
  removePet,
<<<<<<< HEAD
  toEncrypt,
  toDecrypt
};
=======
  getPetById,
  getUserbyId,
  insertLog,
};
>>>>>>> be16d8a850679a698aacd093d8bb11c51ccb7e6f
