import React, { useState, useEffect } from "react";
import { Button, Paper, TextField, MenuItem } from "@mui/material";
import Axios from "axios";
import "../css/AddPet.css";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const AddPet = () => {
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petColor, setPetColor] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petMicrochipNum, setPetMicrochipNum] = useState("");
  const [petFood, setPetFood] = useState("");

  const [ownerID, setOwnerID] = useState("");
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/GetAllUsers")
      .then((response) => {
        setOwners(response.data);
      })
      .catch((error) => {
        console.error("Error fetching owners:", error);
      });
  }, []);

  const handleAddPet = () => {
    const petData = {
      petName,
      petBreed,
      petAge,
      petColor,
      petWeight,
      petMicrochipNum,
      petFood,
      Owner_ownerId: ownerID,
    };

    Axios.post("http://localhost:4000/InsertPet", petData)
      .then(() => {
        console.log("Pet info added successfully");
      })
      .catch((error) => {
        console.error("Error adding pet info:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Paper elevation={3} className="paper">
          <TextField
            select
            fullWidth
            label="Select Owner"
            value={ownerID}
            onChange={(e) => setOwnerID(e.target.value)}
            className="select"
          >
            {owners.map((owner) => (
              <MenuItem key={owner.userId} value={owner.userId}>
                {owner.userFirstName} {owner.userLastName}
              </MenuItem>
            ))}
          </TextField>
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
            variant="contained"
            color="primary"
            href="/home"
            style={{ backgroundColor: "#01B636", color: "white" }}
            className="button"
            onClick={handleAddPet}
          >
            Add Pet
          </Button>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default AddPet;
