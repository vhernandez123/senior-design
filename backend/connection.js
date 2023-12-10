const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const queries = require("./queries");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/GetAllPetsID/:userID", (req, res) => {
  const { userID } = req.params;
  queries.getAllPetsbyID(userID, (err, result) => {
    if (err) {
      console.error("Error retrieving pet data:", err);
      res.status(500).json({ error: "Error retrieving pet data" });
    } else {
      for (let i = 0; i < result.length; i++) {
        result[i]["petName"] = queries.toDecrypt(result[i]["petName"]);
        result[i]["petBreed"] = queries.toDecrypt(result[i]["petBreed"]);
        result[i]["petGender"] = queries.toDecrypt(result[i]["petGender"]);
        result[i]["petAge"] = queries.toDecrypt(result[i]["petAge"]);
        result[i]["petColor"] = queries.toDecrypt(result[i]["petColor"]);
        result[i]["petWeight"] = queries.toDecrypt(result[i]["petWeight"]);
        result[i]["petMicrochipNum"] = queries.toDecrypt(
          result[i]["petMicrochipNum"]
        );
      }
      res.status(200).json(result);
    }
  });
});
app.get("/GetLogsByPetId/:petId", (req, res) => {
  const { petId } = req.params;

  queries.getLogsByPetId(petId, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        logs[i]["logDate"] = queries.toDecrypt(logs[i]["logDate"]);
        logs[i]["logEntry"] = queries.toDecrypt(logs[i]["logEntry"]);
      }
      res.status(200).json(logs);
      // console.log(logs);
    }
  });
});

app.get("/GetFoodLogsByPetID/:Logs_Pet_petID", (req, res) => {
  const { Logs_Pet_petID } = req.params;

  queries.getFoodDetailsbyLogs_Pet_petID(Logs_Pet_petID, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        logs[i]["foodType"] = queries.toDecrypt(logs[i]["foodType"]);
        logs[i]["foodAmount"] = queries.toDecrypt(logs[i]["foodAmount"]);
        logs[i]["foodUnit"] = queries.toDecrypt(logs[i]["foodUnit"]);
        logs[i]["foodWater"] = queries.toDecrypt(logs[i]["foodWater"]);
        logs[i]["foodDanger"] = queries.toDecrypt(logs[i]["foodDanger"]);
        logs[i]["foodDangerDescription"] = queries.toDecrypt(
          logs[i]["foodDangerDescription"]
        );
      }
      res.status(200).json(logs);
      // console.log(logs);
    }
  });
});
app.get("/GetFoodLogsByLogID/:logID", (req, res) => {
  const { logID } = req.params;

  queries.getFoodDetailsbyLogID(logID, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        logs[i]["foodType"] = queries.toDecrypt(logs[i]["foodType"]);
        logs[i]["foodAmount"] = queries.toDecrypt(logs[i]["foodAmount"]);
        logs[i]["foodUnit"] = queries.toDecrypt(logs[i]["foodUnit"]);
        logs[i]["foodWater"] = queries.toDecrypt(logs[i]["foodWater"]);
        logs[i]["foodDanger"] = queries.toDecrypt(logs[i]["foodDanger"]);
        logs[i]["foodDangerDescription"] = queries.toDecrypt(
          logs[i]["foodDangerDescription"]
        );
      }
      res.status(200).json(logs);
      // console.log(logs);
    }
  });
});
app.get("/GetBehaviorDetailsbyLogID/:logID", (req, res) => {
  const { logID } = req.params;

  queries.getBehaviorDetailsbyLogID(logID, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        logs[i]["behaviorActivity"] = queries.toDecrypt(
          logs[i]["behaviorActivity"]
        );
        logs[i]["behaviorAggression"] = queries.toDecrypt(
          logs[i]["behaviorAggression"]
        );
        logs[i]["behaviorChanges"] = queries.toDecrypt(
          logs[i]["behaviorChanges"]
        );
      }
      res.status(200).json(logs);
      // console.log(logs);
    }
  });
});
app.get("/GetMedicationDetailsbyLogID/:logID", (req, res) => {
  const { logID } = req.params;

  queries.getMedicationDetailsbyLogID(logID, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        logs[i]["medicationName"] = queries.toDecrypt(
          logs[i]["medicationName"]
        );
        logs[i]["medicationDosage"] = queries.toDecrypt(
          logs[i]["medicationDosage"]
        );
        logs[i]["medicationDuration"] = queries.toDecrypt(
          logs[i]["medicationDuration"]
        );
        logs[i]["medicationInstructions"] = queries.toDecrypt(
          logs[i]["medicationInstructions"]
        );
      }
      res.status(200).json(logs);
      // console.log(logs);
    }
  });
});
app.get("/GetBathroomDetailsbyLogID/:logID", (req, res) => {
  const { logID } = req.params;

  queries.getBathroomDetailsbyLogID(logID, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        logs[i]["bathroomNumber"] = queries.toDecrypt(
          logs[i]["bathroomNumber"]
        );
        logs[i]["bathroomPoop"] = queries.toDecrypt(logs[i]["bathroomPoop"]);
        logs[i]["bathroomUrine"] = queries.toDecrypt(logs[i]["bathroomUrine"]);
        logs[i]["bathroomVomit"] = queries.toDecrypt(logs[i]["bathroomVomit"]);
      }
      res.status(200).json(logs);
      // console.log(logs);
    }
  });
});

app.get("/GetFoodLogsByPetID/:logID", (req, res) => {
  const { logID } = req.params;

  queries.getFoodDetailsbyLogs_Pet_petID(logID, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        logs[i]["foodType"] = queries.toDecrypt(logs[i]["foodType"]);
        logs[i]["foodAmount"] = queries.toDecrypt(logs[i]["foodAmount"]);
        logs[i]["foodUnit"] = queries.toDecrypt(logs[i]["foodUnit"]);
        logs[i]["foodWater"] = queries.toDecrypt(logs[i]["foodWater"]);
        logs[i]["foodDanger"] = queries.toDecrypt(logs[i]["foodDanger"]);
        logs[i]["foodDangerDescription"] = queries.toDecrypt(
          logs[i]["foodDangerDescription"]
        );
      }
      res.status(200).json(logs);
    }
  });
});

app.get("/GetMedicationLogsByPetID/:Logs_Pet_petID", (req, res) => {
  const { Logs_Pet_petID } = req.params;

  queries.getMedicationDetailsbyLogs_Pet_petID(Logs_Pet_petID, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        logs[i]["medicationName"] = queries.toDecrypt(
          logs[i]["medicationName"]
        );
        logs[i]["medicationDosage"] = queries.toDecrypt(
          logs[i]["medicationDosage"]
        );
        logs[i]["medicationDuration"] = queries.toDecrypt(
          logs[i]["medicationDuration"]
        );
        logs[i]["medicationInstructions"] = queries.toDecrypt(
          logs[i]["medicationInstructions"]
        );
      }
      res.status(200).json(logs);
    }
  });
});

app.get("/GetBathroomLogsByPetID/:Logs_Pet_petID", (req, res) => {
  const { Logs_Pet_petID } = req.params;

  queries.getBathroomDetailsbyLogs_Pet_petID(Logs_Pet_petID, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        logs[i]["bathroomNumber"] = queries.toDecrypt(
          logs[i]["bathroomNumber"]
        );
        logs[i]["bathroomPoop"] = queries.toDecrypt(logs[i]["bathroomPoop"]);
        logs[i]["bathroomUrine"] = queries.toDecrypt(logs[i]["bathroomUrine"]);
        logs[i]["bathroomVomit"] = queries.toDecrypt(logs[i]["bathroomVomit"]);
      }
      res.status(200).json(logs);
    }
  });
});

app.get("/GetBehaviorogsByPetID/:Logs_Pet_petID", (req, res) => {
  const { Logs_Pet_petID } = req.params;

  queries.getBehaviorDetailsbyLogs_Pet_petID(Logs_Pet_petID, (err, logs) => {
    if (err) {
      console.error("Error retrieving logs by petId:", err);
      res.status(500).json({ error: "Error retrieving logs by petId" });
    } else {
      for (let i = 0; i < result.length; i++) {
        logs[i]["behaviorActivity"] = queries.toDecrypt(
          logs[i]["behaviorActivity"]
        );
        logs[i]["behaviorAggression"] = queries.toDecrypt(
          logs[i]["behaviorAggression"]
        );
        logs[i]["behaviorChanges"] = queries.toDecrypt(
          logs[i]["behaviorChanges"]
        );
      }
      res.status(200).json(logs);
    }
  });
});

app.get("/GetLog/:logsID", (req, res) => {
  const { logsID } = req.params;

  queries.getLogById(logsID, (err, log) => {
    if (err) {
      console.error("Error retrieving log by logsID:", err);
      res.status(500).json({ error: "Error retrieving log by logsID" });
    } else {
      if (!log) {
        res.status(404).json({ error: "Log not found" });
      } else {
        for (let i = 0; i < log.length; i++) {
          log[i]["logDate"] = queries.toDecrypt(log[i]["logDate"]);
          log[i]["logEntry"] = queries.toDecrypt(log[i]["logEntry"]);
        }
        res.status(200).json(log);
      }
    }
  });
});

app.get("GetFoodDetails/:logsID", (req, res) => {
  const { logsID } = req.params;
  console.log(logsID);
  queries.getFoodDetailsbyLogsID(logsID, (err, foodDetails) => {
    if (err) {
      console.error("Error retrieving food details by logsID:", err);
      res
        .status(500)
        .json({ error: "Error retrieving food details by logsID" });
    } else {
      // if (!foodDetails) {
      //   res.status(404).json({ error: "Log not found" });
      // } else {
      // console.log(foodDetails);
      for (let i = 0; i < logs.length; i++) {
        foodDetails[i]["foodType"] = queries.toDecrypt(
          foodDetails[i]["foodType"]
        );
        foodDetails[i]["foodAmount"] = queries.toDecrypt(
          foodDetails[i]["foodAmount"]
        );
        foodDetails[i]["foodUnit"] = queries.toDecrypt(
          foodDetails[i]["foodUnit"]
        );
        foodDetails[i]["foodWater"] = queries.toDecrypt(
          foodDetails[i]["foodWater"]
        );
        foodDetails[i]["foodDanger"] = queries.toDecrypt(
          foodDetails[i]["foodDanger"]
        );
        foodDetails[i]["foodDangerDescription"] = queries.toDecrypt(
          foodDetails[i]["foodDangerDescription"]
        );
      }
      res.status(200).json(foodDetails);
      // }
    }
  });
});

app.post("/InsertMedication", (req, res) => {
  const medicationData = req.body;

  queries.insertPetMedication(medicationData, (err) => {
    if (err) {
      console.error("Error inserting pet medication:", err);
      res.status(500).json({ error: "Error inserting pet medication" });
    } else {
      res.status(200).json({ message: "Pet medication inserted successfully" });
    }
  });
});

app.post("/InsertPet", (req, res) => {
  const petData = req.body;
  queries.insertPet(petData, (err, result) => {
    if (err) {
      console.error("Error inserting pet data:", err);
      res.status(500).json({ error: "Error inserting pet data" });
    } else {
      console.log("Pet data inserted successfully");
      res.status(201).json({ message: "Pet data inserted successfully" });
    }
  });
});
app.delete("/RemovePet/:petID", (req, res) => {
  const petID = req.params.petID;
  queries.removePet(petID, (err, result) => {
    if (err) {
      console.error("Error removing pet:", err);
      res.status(500).json({ error: "Error removing pet" });
    } else {
      console.log("Pet removed successfully");
      res.status(200).json({ message: "Pet removed successfully" });
    }
  });
});
app.get("/GetPet/:petID", (req, res) => {
  const { petID } = req.params;

  queries.getPetById(petID, (err, result) => {
    if (err) {
      console.error("Error retrieving pet by ID:", err);
      res.status(500).json({ error: "Error retrieving pet by ID" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Pet not found" });
      } else {
        for (let i = 0; i < result.length; i++) {
          result[i]["petName"] = queries.toDecrypt(result[i]["petName"]);
          result[i]["petBreed"] = queries.toDecrypt(result[i]["petBreed"]);
          result[i]["petGender"] = queries.toDecrypt(result[i]["petGender"]);
          result[i]["petAge"] = queries.toDecrypt(result[i]["petAge"]);
          result[i]["petColor"] = queries.toDecrypt(result[i]["petColor"]);
          result[i]["petWeight"] = queries.toDecrypt(result[i]["petWeight"]);
          result[i]["petMicrochipNum"] = queries.toDecrypt(
            result[i]["petMicrochipNum"]
          );
        }
        res.status(200).json(result[0]);
      }
    }
  });
});

app.get("/GetBehaviorLogsByPetId/:petId", (req, res) => {
  const { petId } = req.params;

  queries.getBehaviorLogsByPetId(petId, (err, behaviorLogs) => {
    if (err) {
      console.error("Error retrieving behavior logs by petId:", err);
      res
        .status(500)
        .json({ error: "Error retrieving behavior logs by petId" });
    } else {
      for (let i = 0; i < behaviorLogs.length; i++) {
        logs[i]["behaviorActivity"] = queries.toDecrypt(
          behaviorLogs[i]["behaviorActivity"]
        );
        logs[i]["behaviorAggression"] = queries.toDecrypt(
          behaviorLogs[i]["behaviorAggression"]
        );
        logs[i]["behaviorChanges"] = queries.toDecrypt(
          behaviorLogs[i]["behaviorChanges"]
        );
      }
      res.status(200).json(behaviorLogs);
    }
  });
});

app.get("/GetMedicationLogsByPetId/:petId", (req, res) => {
  const { petId } = req.params;
  queries.getMedicationLogsByPetId(petId, (err, medicationLogs) => {
    if (err) {
      console.error("Error retrieving medication logs by petId:", err);
      res
        .status(500)
        .json({ error: "Error retrieving medication logs by petId" });
    } else {
      for (let i = 0; i < logs.length; i++) {
        medicationLogs[i]["medicationName"] = queries.toDecrypt(
          medicationLogs[i]["medicationName"]
        );
        medicationLogs[i]["medicationDosage"] = queries.toDecrypt(
          medicationLogs[i]["medicationDosage"]
        );
        medicationLogs[i]["medicationDuration"] = queries.toDecrypt(
          medicationLogs[i]["medicationDuration"]
        );
        medicationLogs[i]["medicationInstructions"] = queries.toDecrypt(
          medicationLogs[i]["medicationInstructions"]
        );
      }
      res.status(200).json(medicationLogs);
    }
  });
});

app.post("/InsertLog", (req, res) => {
  const logData = req.body;
  queries.insertLog(logData, (err, result) => {
    if (err) {
      console.error("Error inserting log data:", err);
      res.status(500).json({ error: "Error inserting log data" });
    } else {
      console.log("Log data inserted successfully");
      res.status(201).json({ message: "Log data inserted successfully" });
    }
  });
});

app.post("/InsertFood", (req, res) => {
  const foodData = req.body;
  // const logsID = foodData.Logs_logsID;
  queries.insertFood(foodData, (err, result) => {
    if (err) {
      console.error("Error inserting food data:", err);
      res.status(500).json({ error: "Error inserting food data" });
    } else {
      console.log("Food data inserted successfully");
      res.status(201).json({ message: "Food data inserted successfully" });
    }
  });
});

app.post("/InsertPetBehavior", (req, res) => {
  const behaviorData = req.body;
  queries.insertPetBehavior(behaviorData, (err, result) => {
    if (err) {
      console.error("Error inserting pet behavior:", err);
      res.status(500).json({ error: "Error inserting pet behavior" });
    } else {
      console.log("Pet behavior inserted successfully");
      res.status(201).json({ message: "Pet behavior inserted successfully" });
    }
  });
});

app.put("/UpdatePet/:petID", (req, res) => {
  const petID = req.params.petID;
  const updatedPetData = req.body;

  queries.updatePetDetails(petID, updatedPetData, (err, result) => {
    if (err) {
      console.error("Error updating pet details:", err);
      res.status(500).json({ error: "Error updating pet details" });
    } else {
      console.log("Pet details updated successfully");
      res.status(200).json({ message: "Pet details updated successfully" });
    }
  });
});

app.post("/insertBathroomData", (req, res) => {
  const bathroomData = req.body;
  queries.insertBathroomData(bathroomData, (err, result) => {
    if (err) {
      console.error("Error inserting bathroom data:", err);
      return res
        .status(500)
        .json({ error: "Error inserting bathroom data", details: err.message });
    } else {
      console.log("Bathroom data inserted successfully");
      return res.status(201).json({
        success: true,
        message: "Bathroom data inserted successfully",
        insertedId: result.insertId,
      });
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
