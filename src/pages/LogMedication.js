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
} from "@mui/material";
import Axios from "axios";
import Navbar from "../components/navbar";
import "../css/LogPet.css";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LogMedication = () => {
  const [formData, setFormData] = useState({
    selectedPetId: "",
    selectedMedicationId: "",
    durationInDays: "",
    dosage: "",
    instructions: "",
    vetinarianId: "",
  });
  const { logsID, petID } = useParams();
  const [userId, setUserId] = useState(null);
  const { user, getIdTokenClaims } = useAuth0();
  const [petsList, setPetsList] = useState([]);
  const [vetList, setVetList] = useState([]);
  const [medicationsList, setMedicationsList] = useState([]);

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

  useEffect(() => {
    Axios.get("http://localhost:4000/GetAllPets")
      .then((response) => {
        setPetsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
      });

    Axios.get("http://localhost:4000/GetAllVets")
      .then((response) => {
        setVetList(response.data.vets);
      })
      .catch((error) => {
        console.error("Error fetching vets:", error);
      });

    Axios.get("http://localhost:4000/GetAllMedications")
      .then((response) => {
        setMedicationsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medications:", error);
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
    const medicationData = {
      logID: logsID,
      petID: petID,
      userID: userId,
      name: formData.selectedMedicationId, // change to medication name
      dosage: formData.dosage,
      duration: formData.durationInDays,
      instruction: formData.instructions,
      vet: formData.selectedVetId // change to vet name
    };

    Axios.post("http://localhost:4000/InsertPetMedication", medicationData)
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
        <FormControl fullWidth>
          <InputLabel>Select Pet</InputLabel>
          <Select
            value={formData.selectedPetId}
            onChange={handleInputChange}
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
          <InputLabel>Select Medication</InputLabel>
          <Select
            value={formData.selectedMedicationId}
            onChange={handleInputChange}
            name="selectedMedicationId"
          >
            {medicationsList.map((medication) => (
              <MenuItem
                key={medication.medicationId}
                value={medication.medicationId}
              >
                {medication.medicationName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          label="How many days?"
          type="number"
          value={formData.durationInDays}
          onChange={handleInputChange}
          name="durationInDays"
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
        <FormControl fullWidth>
          <InputLabel>Select Vet</InputLabel>
          <Select
            value={formData.selectedVetId}
            onChange={handleInputChange}
            name="selectedVetId"
          >
            {vetList.map((vet) => (
              <MenuItem key={vet.vetinarianID} value={vet.vetinarianID}>
                {vet.vetinarianName}
              </MenuItem>
            ))}
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

export default LogMedication;
