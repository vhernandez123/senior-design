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
      res.status(200).json(logs);
      console.log(logs);
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
        res.status(200).json(log);
      }
    }
  });
});

// app.get("/GetAllUsers", (req, res) => {
//   queries.getAllUsers((err, users) => {
//     if (err) {
//       console.error("Error retrieving user data:", err);
//       res.status(500).json({ error: "Error retrieving user data" });
//     } else {
//       res.status(200).json(users);
//     }
//   });
// });

// app.get("/GetAllMedications", (req, res) => {
//   queries.getMedications((err, users) => {
//     if (err) {
//       console.error("Error retrieving medication data:", err);
//       res.status(500).json({ error: "Error retrieving medication data" });
//     } else {
//       res.status(200).json(users);
//     }
//   });
// });

app.post("/InsertPetMedication", (req, res) => {
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
        res.status(200).json(result[0]);
      }
    }
  });
});
app.get("/GetIllnessLogsByPetId/:petId", (req, res) => {
  const { petId } = req.params;

  queries.getIllnessLogsByPetId(petId, (err, illnessLogs) => {
    if (err) {
      console.error("Error retrieving illness logs by petId:", err);
      res.status(500).json({ error: "Error retrieving illness logs by petId" });
    } else {
      res.status(200).json(illnessLogs);
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
      res.status(200).json(medicationLogs);
    }
  });
});

app.post("/InsertLog", (req, res) => {
  const logData = req.body;
  const userId = logData.userId;
  queries.insertLog(logData, userId, (err, result) => {
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
  const logsID = foodData.Logs_logsID;
  queries.insertFood(foodData, logsID, (err, result) => {
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

// app.get("/GetAllVets", (req, res) => {
//   queries.getAllVets((err, vets) => {
//     if (err) {
//       console.error("Error fetching vets:", err);
//       res.status(500).json({ error: "Error fetching vets" });
//     } else {
//       res.status(200).json({ vets });
//     }
//   });
// });

// app.get("/GetAllSymptoms", (req, res) => {
//   queries.getAllSymptoms((err, symptoms) => {
//     if (err) {
//       console.error("Error fetching symptoms:", err);
//       res.status(500).json({ error: "Error fetching symptoms" });
//     } else {
//       res.status(200).json({ symptoms });
//     }
//   });
// });

app.post("/InsertIllness", (req, res) => {
  const illnessData = req.body;
  queries.insertPetHasIllness(illnessData, (err, result) => {
    if (err) {
      console.error("Error inserting illness data:", err);
      return res
        .status(500)
        .json({ error: "Error inserting illness data", details: err.message });
    } else {
      console.log("Illness data inserted successfully");
      return res.status(201).json({
        success: true,
        message: "Illness data inserted successfully",
        insertedId: result.insertId,
      });
    }
  });
});

// app.get("/GetAllIllnesses", (req, res) => {
//   queries.getAllIllnesses((err, illnesses) => {
//     if (err) {
//       console.error("Error fetching illnesses:", err);
//       res.status(500).json({ error: "Error fetching illnesses" });
//     } else {
//       res.status(200).json({ illnesses });
//     }
//   });
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
