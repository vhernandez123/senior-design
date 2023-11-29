import * as React from "react";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormLabel,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Axios from "axios";
import Navbar from "../components/navbar";
import "../css/PetDetails.css";
const UpdateBathroom = () => {
  const [bathroomTimes, setBathroomTimes] = useState("0");
  const [urineState, setUrineState] = useState("");
  const [vomitAmt, setVomitAmt] = useState("0");
  const [petList, setPetList] = useState([]);
  const [vetList, setVetList] = useState([]);
  const [illnessList, setIllnessList] = useState([]);
  const [formData, setFormData] = useState({
    selectedPetId: "",
    selectedVetId: "",
    selectedIllnessId: "",
  });

  useEffect(() => {
    Axios.get("http://localhost:4000/GetAllPets")
      .then((response) => {
        setPetList(response.data);
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

    Axios.get("http://localhost:4000/GetAllIllnesses")
      .then((response) => {
        console.log(response.data);
        setIllnessList(response.data.illnesses);
      })
      .catch((error) => {
        console.error("Error fetching illnesses:", error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const illnessData = {
      Pet_petId: formData.selectedPetId,
      Vetinarian_vetinarianID: formData.selectedVetId,
      Illness_illnessId: formData.selectedIllnessId,
      dateOfDiagnosis: new Date().toISOString().split("T")[0],
      symptoms: `Bathroom times: ${bathroomTimes}, Urine: ${urineState}, Vomited: ${vomitAmt}`,
    };

    Axios.post("http://localhost:4000/InsertIllness", illnessData)
      .then((response) => {
        const illnessId = response.data.insertId;

        if (illnessId) {
          const petHasIllnessData = {
            Pet_petId: formData.selectedPetId,
            Illness_illnessId: illnessId,
            dateOfDiagnosis: new Date().toISOString().split("T")[0],
            symptoms: `Bathroom times: ${bathroomTimes}, Urine: ${urineState}, Vomited: ${vomitAmt}`,
            Vetinarian_vetinarianID: formData.selectedVetId,
          };

          Axios.post(
            "http://localhost:4000/InsertPetHasIllness",
            petHasIllnessData
          )
            .then(() => {
              console.log("Pet_has_Illness data added successfully");
            })
            .catch((error) => {
              console.error("Error adding Pet_has_Illness data:", error);
            });
        } else {
          console.error("Error: illnessId is null or undefined");
        }
      })
      .catch((error) => {
        console.error("Error adding illness info:", error);
      });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="form-container">
      <div className="form Update Bathroom">
        <form onSubmit={handleSubmit}>
          <Stack
            spacing={3}
            direction="column"
            sx={{
              marginBottom: 4,
              marginLeft: 4,
              marginTop: 4,
              marginRight: 4,
            }}
          >
            <h2>Bathroom Habits</h2>
            <FormLabel>
              How many times did your pet use the bathroom today?
            </FormLabel>
            <TextField
              type="number"
              onChange={(e) => setBathroomTimes(e.target.value)}
              value={bathroomTimes}
            />
            <FormLabel>Select the illness (if any)</FormLabel>
            <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Select Illness</InputLabel>
                <Select
                  value={formData.selectedIllnessId}
                  onChange={handleInputChange}
                  name="selectedIllnessId"
                >
                  {illnessList.map((illness) => (
                    <MenuItem key={illness.illnessId} value={illness.illnessId}>
                      {illness.illnessName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <FormLabel>How many times did your pet vomit today?</FormLabel>
            <TextField
              type="number"
              onChange={(e) => setVomitAmt(e.target.value)}
              value={vomitAmt}
            />
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
            <Button
              variant="outlined"
              href="/home"
              color="secondary"
              onClick={handleSubmit}
              className="button"
            >
              Save
            </Button>
            <Button
              variant="outlined"
              href="/UpdateBehavior"
              color="secondary"
              className="button"
            >
              Next
            </Button>
          </Stack>
        </form>
      </div></div>
    </div>
  );
};

export default UpdateBathroom;
