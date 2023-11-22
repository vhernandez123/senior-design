import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Axios from "axios";
import Navbar from "../components/navbar";
import "../css/LogPet.css";

const UpdateBehavior = () => {
  const [formData, setFormData] = useState({
    selectedPetId: "",
    aggression: "no",
    aggressionExplanation: "",
    selectedSymptomId: "",
  });

  const [petsList, setPetsList] = useState([]);
  const [symptomsList, setSymptomsList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/GetAllSymptoms")
      .then((response) => {
        console.log("Symptoms data:", response.data);
        if (Array.isArray(response.data)) {
          setSymptomsList(response.data);
        } else {
          console.error("Symptoms data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching symptoms:", error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:4000/GetAllPets")
      .then((response) => {
        setPetsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
      });
  }, []);

  const handlePetChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSymptomChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFinish = () => {
    const behaviorData = {
      logDate: new Date().toISOString().split("T")[0],
      selectedPetId: formData.selectedPetId,
      aggression: formData.aggression,
      aggressionExplanation: formData.aggressionExplanation,
      selectedSymptomId: formData.selectedSymptomId,
    };

    Axios.post("http://localhost:4000/InsertBehavior", behaviorData)
      .then(() => {
        console.log("Behavior info added successfully");
      })
      .catch((error) => {
        console.error("Error adding behavior info:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="form">
        <Typography variant="h6">Behavior</Typography>
        <FormControl fullWidth>
          <InputLabel>Select Pet</InputLabel>
          <Select
            value={formData.selectedPetId}
            onChange={handlePetChange}
            name="selectedPetId"
          >
            {petsList.map((pet) => (
              <MenuItem key={pet.petId} value={pet.petId}>
                {pet.petName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Select Symptom</InputLabel>
          <Select
            value={formData.selectedSymptomId}
            onChange={handleSymptomChange}
            name="selectedSymptomId"
          >
            {symptomsList.map((symptom) => (
              <MenuItem key={symptom.symptomId} value={symptom.symptomId}>
                {symptom.symptomName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl>Any aggression observed?</FormControl>
        <RadioGroup
          value={formData.aggression}
          onChange={(e) =>
            handleInputChange({
              target: { name: "aggression", value: e.target.value },
            })
          }
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>
        {formData.aggression === "yes" && (
          <div>
            <FormControl>Explain aggression:</FormControl>
            <TextField
              type="text"
              value={formData.aggressionExplanation}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "aggressionExplanation",
                    value: e.target.value,
                  },
                })
              }
            />
          </div>
        )}
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

export default UpdateBehavior;
