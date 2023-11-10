import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Axios from "axios";
import Navbar from "../components/navbar";
import "../css/LogPet.css";

const LogPet = () => {
  const [formData, setFormData] = useState({
    foodType: "",
    foodNumber: "",
    selectedPetId: "",
    selectedUnit: "oz",
  });

  const [petList, setPetList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/GetAllPets")
      .then((response) => {
        setPetList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFinish = () => {
    const logEntry = `Ate  ${formData.foodNumber} ${formData.selectedUnit} of ${formData.foodType} `;

    const feedingData = {
      logDate: new Date().toISOString().split("T")[0],
      logEntry: logEntry,
      logFood: formData.foodNumber,
      Pet_petId: formData.selectedPetId,
      logFoodUnit: formData.selectedUnit,
    };

    Axios.post("http://localhost:4000/InsertLog", feedingData)
      .then(() => {
        console.log("Feeding info added successfully");
      })
      .catch((error) => {
        console.error("Error adding feeding info:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="form">
        <Typography variant="h6">Food</Typography>
        <TextField
          label="What did your pet eat today? (Food Type)"
          fullWidth
          name="foodType"
          value={formData.foodType}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <TextField
          label="How many did your pet eat? (Number)"
          fullWidth
          type="number"
          name="foodNumber"
          value={formData.foodNumber}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Select Pet</InputLabel>
          <Select
            value={formData.selectedPetId}
            onChange={handleInputChange}
            name="selectedPetId"
          >
            {petList.map((pet) => (
              <MenuItem key={pet.petId} value={pet.petId}>
                {pet.petName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Select Unit</InputLabel>
          <Select
            value={formData.selectedUnit}
            onChange={handleInputChange}
            name="selectedUnit"
          >
            <MenuItem value="oz">oz</MenuItem>
            <MenuItem value="lbs">lbs</MenuItem>
            <MenuItem value="g">grams</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          href="/home"
          onClick={handleFinish}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default LogPet;
