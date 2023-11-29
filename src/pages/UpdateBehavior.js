import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Stack,
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
  const [activity, setActivity] = useState("active");
  const [behaviorChanges, setBehaviorChanges] = useState("routine change");

  useEffect(() => {
    Axios.get("http://localhost:4000/GetAllSymptoms")
      .then((response) => {
        if (Array.isArray(response.data.symptoms)) {
          setSymptomsList(response.data.symptoms);
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
    let aggressionExplanation = "";

    if (
      formData.aggression === "yes" &&
      formData.aggressionExplanation.trim() !== ""
    ) {
      aggressionExplanation = formData.aggressionExplanation.trim();
    } else {
      aggressionExplanation = "No signs of aggression";
    }

    const behaviorData = {
      selectedPetId: formData.selectedPetId,
      aggression: formData.aggression,
      aggressionExplanation: aggressionExplanation,
      selectedSymptomId: formData.selectedSymptomId,
      activity: activity,
      behaviorChanges: behaviorChanges,
    };

    Axios.post("http://localhost:4000/InsertPetBehavior", behaviorData)
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
      <div className="form-container">
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
          <InputLabel>Select a Symptom your pet is Experiencing</InputLabel>
          <Select
            value={formData.selectedSymptomId}
            onChange={handleSymptomChange}
            name="selectedSymptomId"
          >
            {symptomsList.map((symptom) => (
              <MenuItem key={symptom.SymptomId} value={symptom.SymptomId}>
                {symptom.symptom_type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl>Activity Level?</FormControl>
        <br />
        <br />
        <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
          <RadioGroup
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <FormControlLabel
              value="active"
              control={<Radio />}
              label="Active"
            />
            <FormControlLabel value="lazy" control={<Radio />} label="Lazy" />
            <FormControlLabel value="both" control={<Radio />} label="Both" />
          </RadioGroup>
        </Stack>
        <FormControl>Any Behavior Changes?</FormControl>
        <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
          <RadioGroup
            value={behaviorChanges}
            onChange={(e) => setBehaviorChanges(e.target.value)}
          >
            <FormControlLabel
              value="routine change"
              control={<Radio />}
              label="Routine Change"
            />
            <FormControlLabel
              value="other behavioral change"
              control={<Radio />}
              label="Other Behavioral Change"
            />
            <FormControlLabel
              value="no behavioral change"
              control={<Radio />}
              label="No Behavioral Change"
            />
          </RadioGroup>
        </Stack>
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
            <br />
            <br />
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
    </div>
  );
};

export default UpdateBehavior;
