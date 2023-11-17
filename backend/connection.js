const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const queries = require("./queries");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/GetAllPets", (req, res) => {
  queries.getAllPets((err, result) => {
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
    }
  });
});

app.get("/GetAllUsers", (req, res) => {
  queries.getAllUsers((err, users) => {
    if (err) {
      console.error("Error retrieving user data:", err);
      res.status(500).json({ error: "Error retrieving user data" });
    } else {
      res.status(200).json(users);
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
app.delete("/RemovePet/:petId", (req, res) => {
  const petId = req.params.petId;
  queries.removePet(petId, (err, result) => {
    if (err) {
      console.error("Error removing pet:", err);
      res.status(500).json({ error: "Error removing pet" });
    } else {
      console.log("Pet removed successfully");
      res.status(200).json({ message: "Pet removed successfully" });
    }
  });
});
app.get("/GetPet/:petId", (req, res) => {
  const { petId } = req.params;

  queries.getPetById(petId, (err, result) => {
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

// app.get("/GetUser/:userId", (req, res) => {
//   const { userId } = req.params;

//   queries.getUserbyId(userId, (err, result) => {
//     if (err) {
//       console.error("Error retrieving user by ID:", err);
//       res.status(500).json({ error: "Error retrieving pet by ID" });
//     } else {
//       if (result.length === 0) {
//         res.status(404).json({ error: "User not found" });
//       } else {
//         res.status(200).json(result[0]);
//       }
//     }
//   });
// });
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

app.get("/GetAllVets", (req, res) => {
  queries.getAllVets((err, vets) => {
    if (err) {
      console.error("Error fetching vets:", err);
      res.status(500).json({ error: "Error fetching vets" });
    } else {
      res.status(200).json({ vets });
    }
  });
});

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

app.get("/GetAllIllnesses", (req, res) => {
  queries.getAllIllnesses((err, illnesses) => {
    if (err) {
      console.error("Error fetching illnesses:", err);
      res.status(500).json({ error: "Error fetching illnesses" });
    } else {
      res.status(200).json({ illnesses });
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
