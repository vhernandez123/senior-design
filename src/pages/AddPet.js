import React, { useState, useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import Axios from "axios";
import "../css/AddPet.css";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import useUserFinder  from "../components/userFinder.js";

const AddPet = () => {
  const { user, getIdTokenClaims } = useAuth0();
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petColor, setPetColor] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petMicrochipNum, setPetMicrochipNum] = useState("");
  const [petGender, setPetGender] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Check if user is defined before accessing its properties
        if (user) {
          const idToken = await getIdTokenClaims();
          setUserId(idToken['https://example.com/userId']);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [getIdTokenClaims, user]); // Include user in the dependency array

  const handleAddPet = async () => {
    // Check if user and userId are defined before proceeding
    if (user && userId) {
      const petData = {
        petName,
        petBreed,
        petGender,
        petAge,
        petColor,
        petWeight,
        petMicrochipNum,
        Owner_ownerId: userId,
      };

      try {
        await Axios.post("http://localhost:4000/InsertPet", petData);
        console.log("Pet info added successfully");
      } catch (error) {
        console.error("Error adding pet info:", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Paper elevation={3} className="paper">
          <TextField
            fullWidth
            label="Select Owner"
            // value={`${user?.given_name || ""} ${user?.family_name || ""}`}
            value={`${user?.name }`}
            disabled
            className="select"
          />
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
            label="Gender"
            value={petGender}
            onChange={(e) => setPetGender(e.target.value)}
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
