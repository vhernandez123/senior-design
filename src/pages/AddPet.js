import React, { useState } from "react";
import { Button, Paper, TextField, Select, MenuItem } from "@mui/material";
import Axios from "axios";

const AddPet = () => {
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petColor, setPetColor] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petMicrochipNum, setPetMicrochipNum] = useState("");
  const [petFood, setPetFood] = useState("");

  const handleAddPet = () => {
    const petData = {
      petName,
      petBreed,
      petAge,
      petColor,
      petWeight,
      petMicrochipNum,
      petFood,
    };

    Axios.post("http://localhost:4000/InsertPet", petData)
      .then(() => {
        console.log("Pet info added successfully");
        // Handle any additional logic or UI updates here
      })
      .catch((error) => {
        console.error("Error adding pet info:", error);
        // Handle error and display a message to the user if needed
      });
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <TextField
          fullWidth
          label="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Breed"
          value={petBreed}
          onChange={(e) => setPetBreed(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Age"
          value={petAge}
          onChange={(e) => setPetAge(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Color"
          value={petColor}
          onChange={(e) => setPetColor(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Weight"
          value={petWeight}
          onChange={(e) => setPetWeight(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Microchip Number"
          value={petMicrochipNum}
          onChange={(e) => setPetMicrochipNum(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Food"
          value={petFood}
          onChange={(e) => setPetFood(e.target.value)}
          margin="normal"
        />

        <Button
          href="/"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          onClick={handleAddPet}
        >
          Add Pet
        </Button>
      </Paper>
    </div>
  );
};

export default AddPet;
