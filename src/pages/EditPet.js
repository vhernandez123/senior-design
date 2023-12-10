import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Paper, TextField } from "@mui/material";
import "../css/AddPet.css";
import Navbar from "../components/navbar";
import DataTable from "../components/LogTable";
import Footer from "../components/Footer";

const EditPet = () => {
  const [petDetails, setPetDetails] = useState({});
  const [editedPetDetails, setEditedPetDetails] = useState({});

  const { petID } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:4000/GetPet/${petID}`)
      .then((response) => {
        setPetDetails(response.data);
        setEditedPetDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
      });
  }, [petID]);

  const handleEditPet = () => {
    Axios.put(`http://localhost:4000/UpdatePet/${petID}`, editedPetDetails)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating pet details:", error);
      });
  };

  const handleChange = (field, value) => {
    setEditedPetDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Paper elevation={3} className="paper">
          <TextField
            fullWidth
            label="Pet Name"
            value={editedPetDetails.petName || ""}
            onChange={(e) => handleChange("petName", e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Breed"
            value={editedPetDetails.petBreed || ""}
            onChange={(e) => handleChange("petBreed", e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Gender"
            value={editedPetDetails.petGender || ""}
            onChange={(e) => handleChange("petGender", e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Age"
            value={editedPetDetails.petAge || ""}
            onChange={(e) => handleChange("petAge", e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Color"
            value={editedPetDetails.petColor || ""}
            onChange={(e) => handleChange("petColor", e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Weight"
            value={editedPetDetails.petWeight || ""}
            onChange={(e) => handleChange("petWeight", e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Microchip Number"
            value={editedPetDetails.petMicrochipNum || ""}
            onChange={(e) => handleChange("petMicrochipNum", e.target.value)}
            variant="outlined"
            margin="normal"
          />

          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleEditPet();
              }}
              href="/home"
              style={{ backgroundColor: "#01B636", color: "white" }}
              className="button"
            >
              Save Changes
            </Button>
          </div>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default EditPet;
