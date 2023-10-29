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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});