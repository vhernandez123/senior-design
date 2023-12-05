import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import Axios from "axios";
import Navbar from "../components/navbar";
import "../css/LogPet.css";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const UpdateBathroom = () => {
  const [formData, setFormData] = useState({
    bathroomNumber: "",
    bathroomPoop: "",
    bathroomUrine: "",
    bathroomVomit: "0",
  });

  const { petID, logsID } = useParams();
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
    console.log("event:", event);
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
      const bathroomData = {
        bathroomNumber: formData.bathroomNumber,
        bathroomPoop: formData.bathroomPoop,
        bathroomUrine: formData.bathroomUrine,
        bathroomVomit: formData.bathroomVomit,
        Logs_logsID: logsID, 
        Logs_Pet_petID: petID,
        Logs_Pet_User_userID: userId,
      };

      const response = await Axios.post(
        "http://localhost:4000/insertBathroomData",
        bathroomData
      );
    } catch (error) {
      console.error("Error adding bathroom info to Bathroom table:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form">
        <Typography variant="h6">Bathroom</Typography>
        <TextField
          label="Number of times used the bathroom"
          fullWidth
          type="number"
          name="bathroomNumber"
          value={formData.bathroomNumber}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <TextField
          label="Description of poop (if any)"
          fullWidth
          name="bathroomPoop"
          value={formData.bathroomPoop}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <TextField
          label="Description of urine (if any)"
          fullWidth
          name="bathroomUrine"
          value={formData.bathroomUrine}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <FormControl>
          <br />
          <br />
          <InputLabel>Any pet vomit today?</InputLabel>
          <TextField
            type="number"
            name="bathroomVomit"
            value={formData.bathroomVomit}
            onChange={handleInputChange}
          />
        </FormControl>
        <br />
        <br />

        {/* <Button variant="contained" color="primary" onClick={handleFinish}>
          Save
        </Button> */}

        <br />
        <br />
        <Link to={`/UpdateBehavior/${logsID}/${petID}`}>
          <Button variant="contained" color="primary" onClick={handleFinish}>
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UpdateBathroom;
