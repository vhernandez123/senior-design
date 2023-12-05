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

const LogPet = () => {
  const [formData, setFormData] = useState({});
  const [userId, setUserId] = useState(null);
  const { petID } = useParams();
  const { logsID } = useParams();
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
      const loggingData = {
        logDate: new Date().toISOString().split("T")[0],
        logEntry: formData.logEntry || "",
        Pet_petID: petID || "",
        userId: userId || "",
      };

      const response = await Axios.post(
        "http://localhost:4000/InsertLog",
        loggingData
      );
      console.log("Feeding info added to Logs table successfully");

      window.location.href = `/pet/${petID}`;
    } catch (error) {
      console.error("Error posting log data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <div className="form">
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            Logging Information
          </Typography>
          <TextField
            label="What are you logging about your pet?"
            fullWidth
            name="logEntry"
            value={formData.logEntry || ""}
            onChange={handleInputChange}
            variant="outlined"
          />
          <br />
          <br />

          <Button
            variant="contained"
            color="primary"
            href={`/pet/${petID}`}
            onClick={handleFinish}
          >
            Add Log
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogPet;
