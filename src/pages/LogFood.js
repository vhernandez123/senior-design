import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Axios from "axios";
import Navbar from "../components/navbar";
import "../css/LogPet.css";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LogFood = () => {
  const [formData, setFormData] = useState({
    foodType: "",
    foodNumber: "",
    selectedUnit: "oz",
    drank: "0",
    ateBad: "",
    ateBadDesc: "",
  });
  const { logsID, petID } = useParams();
  const [userId, setUserId] = useState(null);
  const { user, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        if (user) {
          const idToken = await getIdTokenClaims();
          setUserId(idToken["https://example.com/userId"]);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [getIdTokenClaims, user]);

  const handleInputChange = (event) => {
    const { name, value } = event?.target || event;
    if (name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: String(value),
      }));
    }
  };

  const handleFinish = async () => {
    try {
      const totalFoodEaten = Number(formData.foodNumber);
      const totalDrinks = Number(formData.drank);

      const ateBadText =
        formData.ateBad === "yes"
          ? `Ate something bad: ${formData.ateBadDesc}.`
          : "Did not eat something bad.";

      const logEntry = `Ate ${totalFoodEaten} ${formData.selectedUnit} of ${formData.foodType}, 
        drank ${totalDrinks} times. ${ateBadText}`;

      const foodData = {
        foodType: formData.foodType,
        foodAmount: formData.foodNumber,
        foodUnit: formData.selectedUnit|| "",
        foodWater: formData.drank || "",
        foodDanger: formData.ateBad || "nothing bad was eaten",
        foodDangerDescription: formData.ateBadDesc || "",
        Logs_logsID: logsID,
        Logs_Pet_petID: petID,
        Logs_Pet_User_userID: userId,
      };

      const response = await Axios.post(
        "http://localhost:4000/InsertFood",
        foodData
      );

      const foodLogsID = response.data.insertId;

      if (foodLogsID !== null) {
        console.log("Food info added to Food table successfully");
      } else {
        throw new Error("foodLogsID is null");
      }
    } catch (error) {
      console.error("Error adding food info to Food table:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form">
      <Typography variant="h6" style={{ padding: '10px', color:'red', fontWeight:'bolder' }}>
  Food (All Fields Required)
</Typography>

        <TextField
          label="What did your pet eat today? (Food Brand and indicate dry or wet food)"
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
          <br />
          <br />
          <InputLabel>Select Unit</InputLabel>
          <RadioGroup
            value={formData.selectedUnit}
            onChange={(e) =>
              handleInputChange({ name: "selectedUnit", value: e.target.value })
            }
          >
            <FormControlLabel value="oz" control={<Radio />} label="oz" />
            <FormControlLabel value="cans" control={<Radio />} label="cans" />
            <FormControlLabel value="cups" control={<Radio />} label="cups" />
            <FormControlLabel value="Ibs" control={<Radio />} label="Ibs" />
            <FormControlLabel value="g" control={<Radio />} label="grams" />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <FormControl>How many times did your pet drink today?</FormControl>
        <br />
        <br />
        <TextField
          type="number"
          value={formData.drank}
          onChange={(e) =>
            handleInputChange({ name: "drank", value: e.target.value })
          }
        />
        <br />
        <br />
        <FormControl>
          Did your pet eat something it wasn't supposed to?
        </FormControl>
        <RadioGroup
          value={formData.ateBad}
          onChange={(e) =>
            handleInputChange({ name: "ateBad", value: e.target.value })
          }
        >
          <FormControlLabel value="no" control={<Radio />} label="no" />
          <FormControlLabel value="yes" control={<Radio />} label="yes" />
        </RadioGroup>
        <br />
        <br />
        <FormControl>If yes, describe it here:</FormControl>
        <br />
        <br />
        <TextField
          type="text"
          value={formData.ateBadDesc}
          onChange={(e) =>
            handleInputChange({ name: "ateBadDesc", value: e.target.value })
          }
        />
        <br />
        <br />
        <Link to={`/LoggingForms/${logsID}/${petID}`}>
          <Button variant="contained" color="primary" onClick={handleFinish}>
            Finish
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LogFood;
