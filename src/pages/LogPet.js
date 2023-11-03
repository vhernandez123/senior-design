import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Navbar from "../components/navbar";
import "../css/LogPet.css";

const LogPet = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    foodType: "",
    foodNumber: "",
    foodUnit: "oz",
    treatType: "",
    treatNumber: "",
    treatUnit: "treats",
    waterIntake: "",
    consumedWrong: false,
    descriptionConsumedWrong: "",
    bathroomFrequency: "",
    bathroomDescription: [],
    vomitFrequency: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBathroomAttributesChange = (event) => {
    const { name, checked } = event.target;
    let updatedBathroomDescription = [...formData.bathroomDescription];

    if (checked) {
      updatedBathroomDescription.push(name);
    } else {
      updatedBathroomDescription = updatedBathroomDescription.filter(
        (item) => item !== name
      );
    }

    setFormData((prevData) => ({
      ...prevData,
      bathroomDescription: updatedBathroomDescription,
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <Navbar />
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
              label="How much did your pet eat? (Number)"
              fullWidth
              type="number"
              name="foodNumber"
              value={formData.foodNumber}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel>What unit? (oz/lbs/g)</InputLabel>
              <Select
                value={formData.foodUnit}
                onChange={handleInputChange}
                name="foodUnit"
              >
                <MenuItem value="oz">oz</MenuItem>
                <MenuItem value="lbs">lbs</MenuItem>
                <MenuItem value="g">g</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <Typography variant="h6">Treats</Typography>
            <TextField
              label="What treats did your pet eat today? (Treat Type)"
              fullWidth
              name="treatType"
              value={formData.treatType}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <TextField
              label="How many treats?"
              fullWidth
              type="number"
              name="treatNumber"
              value={formData.treatNumber}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel>What unit? (oz/lbs/g/treats)</InputLabel>
              <Select
                value={formData.treatUnit}
                onChange={handleInputChange}
                name="treatUnit"
              >
                <MenuItem value="oz">oz</MenuItem>
                <MenuItem value="lbs">lbs</MenuItem>
                <MenuItem value="g">g</MenuItem>
                <MenuItem value="treats">treats</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              label="How many times did your pet drink water today?"
              fullWidth
              type="number"
              name="waterIntake"
              value={formData.waterIntake}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consumedWrong}
                  onChange={handleInputChange}
                  name="consumedWrong"
                />
              }
              label="Did your pet consume something it wasn’t supposed to?"
            />
            {formData.consumedWrong && (
              <TextField
                label="If yes, describe it here"
                fullWidth
                name="descriptionConsumedWrong"
                value={formData.descriptionConsumedWrong}
                onChange={handleInputChange}
              />
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <Navbar />
            <Typography variant="h6">Bathroom Activity</Typography>
            <TextField
              label="How many times did your pet use the bathroom today?"
              fullWidth
              type="number"
              name="bathroomFrequency"
              value={formData.bathroomFrequency}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <Typography variant="subtitle1">
              Select the attributes that best describe your pet’s bathroom
              production today:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.bathroomDescription.includes("runnyPoop")}
                  onChange={handleBathroomAttributesChange}
                  name="runnyPoop"
                />
              }
              label="Runny poop"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.bathroomDescription.includes("chunkyPoop")}
                  onChange={handleBathroomAttributesChange}
                  name="chunkyPoop"
                />
              }
              label="Chunky poop"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.bathroomDescription.includes(
                    "offColorUrine"
                  )}
                  onChange={handleBathroomAttributesChange}
                  name="offColorUrine"
                />
              }
              label="Off-color urine"
            />
            <br />
            <br />
            <TextField
              label="How many times did your pet vomit today?"
              fullWidth
              type="number"
              name="vomitFrequency"
              value={formData.vomitFrequency}
              onChange={handleInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="formContainer">
      <div className="buttonContainer">
        {getStepContent(activeStep)}
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === 0 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" href="/home">
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogPet;
