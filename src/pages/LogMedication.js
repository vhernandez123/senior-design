import React, { useState, useEffect } from "react";
import { Button, Typography, TextField } from "@mui/material";
import Axios from "axios";
import Navbar from "../components/navbar";
import "../css/LogPet.css";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LogMedication = () => {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    duration: "",
    instructions: "",
    vet: "",
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
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFinish = () => {
    const medicationData = {
      Logs_logsID: logsID,
      Logs_Pet_petID: petID,
      Logs_Pet_User_userID: userId,
      name: formData.name,
      dosage: formData.dosage,
      duration: formData.duration,
      instruction: formData.instructions, // Changed to match the function parameter
      vet: formData.vet,
    };

    Axios.post("http://localhost:4000/InsertMedication", medicationData)
      .then(() => {
        console.log("Medication info added successfully");
      })
      .catch((error) => {
        console.error("Error adding medication info:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="form">
        <Typography variant="h6">Add Medication</Typography>
        <br />
        <br />
        <TextField
          label="Medication Name"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
        />
        <br />
        <br />
        <TextField
          label="Vet Name"
          value={formData.vet}
          onChange={handleInputChange}
          name="vet"
        />
        <br />
        <br />
        <TextField
          label="How many days?"
          type="number"
          value={formData.duration}
          onChange={handleInputChange}
          name="duration"
        />
        <br />
        <br />
        <TextField
          label="Dosage"
          value={formData.dosage}
          onChange={handleInputChange}
          name="dosage"
        />
        <br />
        <br />
        <TextField
          label="Instructions"
          multiline
          rows={4}
          value={formData.instructions}
          onChange={handleInputChange}
          name="instructions"
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

export default LogMedication;
