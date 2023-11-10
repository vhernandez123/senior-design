import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Axios from "axios";
import Navbar from "../components/navbar";
import "../css/LogPet.css";

const LogBathroom = () => {
  const [formData, setFormData] = useState({
    poopTypes: [],
    behaviorTypes: [],
    signsOfAggression: [],
    urineType: [],
    vomitNumber: "",
    selectedPetId: "",
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

    if (
      name === "poopTypes" ||
      name === "urineType" ||
      name === "behaviorTypes" ||
      name === "signsOfAggression"
    ) {
      const newAttribute = formData[name].slice();
      const selectedIndex = newAttribute.indexOf(value);

      if (selectedIndex === -1) {
        newAttribute.push(value);
      } else {
        newAttribute.splice(selectedIndex, 1);
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: newAttribute,
      }));
    } else if (name === "vomitNumber" || name === "selectedPetId") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFinish = () => {
    const bathroomEntry = `Poop Types: ${formData.poopTypes.join(
      ", "
    )}, Urine Types: ${formData.urineType.join(", ")}, Vomit Count: ${
      formData.vomitNumber
    }, Behaviors: ${formData.behaviorTypes.join(
      ", "
    )}, Signs of Aggression: ${formData.signsOfAggression.join(", ")}`;

    const bathroomData = {
      logDate: new Date().toISOString().split("T")[0],
      logEntry: bathroomEntry,
      logPoopTypes: formData.poopTypes,
      logUrineTypes: formData.urineType,
      logVomitNumber: formData.vomitNumber,
      logBehaviors: formData.behaviorTypes,
      logSignsOfAggression: formData.signsOfAggression,
      Pet_petId: formData.selectedPetId,
    };

    Axios.post("http://localhost:4000/InsertBathroomLog", bathroomData)
      .then(() => {
        console.log("Bathroom info added successfully");
      })
      .catch((error) => {
        console.error("Error adding bathroom info:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="form">
        <Typography variant="h6">Bathroom</Typography>
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
        <Typography variant="subtitle1">
          Select the attributes that best describe your pet's bathroom
          production today:
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Poop Types</InputLabel>
          <Select
            multiple
            value={formData.poopTypes}
            onChange={handleInputChange}
            name="poopTypes"
          >
            <MenuItem value="runny">Runny Poop</MenuItem>
            <MenuItem value="chunky">Chunky Poop</MenuItem>
            <MenuItem value="no">No Poop</MenuItem>
            <MenuItem value="none">None of the above</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Urine Types</InputLabel>
          <Select
            multiple
            value={formData.urineType}
            onChange={handleInputChange}
            name="urineType"
          >
            <MenuItem value="off-color">Off-color Urine</MenuItem>
            <MenuItem value="no">No Urine</MenuItem>
            <MenuItem value="none">None of the above</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          label="How many times did your pet vomit today?"
          fullWidth
          type="number"
          name="vomitNumber"
          value={formData.vomitNumber}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <Typography variant="h6">Behavior</Typography>
        <Typography variant="subtitle1">
          Select any behaviors your pet exhibited today:
        </Typography>
        <br />
        <FormControl fullWidth>
          <InputLabel>Behavior Types</InputLabel>
          <Select
            multiple
            value={formData.behaviorTypes}
            onChange={handleInputChange}
            name="behaviorTypes"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Lazy">Lazy</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Signs of Aggression</InputLabel>
          <Select
            multiple
            value={formData.signsOfAggression}
            onChange={handleInputChange}
            name="signsOfAggression"
          >
            <MenuItem value="increase">Increased aggression</MenuItem>
            <MenuItem value="decrease">Decreased aggression</MenuItem>
            <MenuItem value="none">None</MenuItem>
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

export default LogBathroom;
