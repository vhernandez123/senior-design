import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "../css/PetDetails.css";
import Navbar from "../components/navbar";
import { Button } from "@mui/material";

const PetDetails = () => {
  const [petDetails, setPetDetails] = useState({});
  const [petLogs, setPetLogs] = useState([]);
  const [petIllnessLogs, setPetIllnessLogs] = useState([]);
  const [petBehaviorLogs, setPetBehaviorLogs] = useState([]);
  const [petMedicationLogs, setPetMedicationLogs] = useState([]);
  const { petId } = useParams();

  const formatLogDate = (logDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(logDate).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    Axios.get(`http://localhost:4000/GetPet/${petId}`)
      .then((response) => {
        setPetDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
      });

    Axios.get(`http://localhost:4000/GetLogsByPetId/${petId}`)
      .then((response) => {
        setPetLogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet logs:", error);
      });

    Axios.get(`http://localhost:4000/GetIllnessLogsByPetId/${petId}`)
      .then((response) => {
        setPetIllnessLogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet illness logs:", error);
      });

    Axios.get(`http://localhost:4000/GetMedicationLogsByPetId/${petId}`)
      .then((response) => {
        setPetMedicationLogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet medication logs:", error);
      });

    Axios.get(`http://localhost:4000/GetBehaviorLogsByPetId/${petId}`)
      .then((response) => {
        setPetBehaviorLogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet behavior logs:", error);
      });
  }, [petId]);

  return (
    <div>
      <Navbar />
      <div className="pet-details-container">
        <div className="pet-info">
          <h2 className="pet-name">{petDetails.petName}</h2>
          <div className="pet-properties">
            <p>
              <span className="property-label">Breed:</span>{" "}
              {petDetails.petBreed}
            </p>
            <p>
              <span className="property-label">Age:</span> {petDetails.petAge}
            </p>
            <p>
              <span className="property-label">Color:</span>{" "}
              {petDetails.petColor}
            </p>
            <p>
              <span className="property-label">Weight:</span>{" "}
              {petDetails.petWeight}
            </p>
            <p>
              <span className="property-label">Microchip Number:</span>{" "}
              {petDetails.petMicrochipNum}
            </p>
            <p>
              <span className="property-label">Food:</span> {petDetails.petFood}
            </p>
          </div>
          <h3>What has your pet eaten today?</h3>
          <Button
            href="/LogPet"
            variant="contained"
            className="custom-button"
            style={{ backgroundColor: "#01B636", color: "white" }}
          >
            Log Food
          </Button>
          <br />
          <br />
          <h3>Concerned about your pet?</h3>
          <Button
            href="/UpdateBathroom"
            variant="contained"
            className="custom-button"
            style={{ backgroundColor: "#01B636", color: "white" }}
          >
            Click Here
          </Button>
          <br />
          <br />
          <h3>Does your pet take any medication?</h3>
          <Button
            href="/LogMedication"
            variant="contained"
            className="custom-button"
            style={{ backgroundColor: "#01B636", color: "white" }}
          >
            Log it Here
          </Button>
        </div>
      </div>
      <div className="PetDetailsSpan">
        <div className="pet-logs notepad">
          <div className="log-box">
            <h3>Food logs for {petDetails.petName}</h3>
            <ul>
              {petLogs.map((log) => (
                <li key={log.logsId}>
                  {log.logEntry} on {formatLogDate(log.logDate)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pet-logs notepad">
          <div className="log-box">
            <h3>Illness logs for {petDetails.petName}</h3>
            <ul>
              {petIllnessLogs.map((illnessLog) => (
                <li key={illnessLog.illnessLogId}>
                  {illnessLog.symptoms} on{" "}
                  {formatLogDate(illnessLog.dateOfDiagnosis)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="PetDetailsSpan">
        <div className="pet-logs notepad">
          <div className="log-box">
            <h3>Behavior logs for {petDetails.petName}</h3>
            <ul>
              {petBehaviorLogs.map((behaviorLog) => (
                <li key={behaviorLog.behaviorLogId}>
                  <p>
                    Current Activity: {behaviorLog.activity}, Any signs of
                    aggression:{" "}
                    {behaviorLog.aggression === "yes" ? "Yes" : "No"}, Behavior
                    Changes: {behaviorLog.behaviorChanges}
                  </p>
                  <p>Logged on {formatLogDate(behaviorLog.logDate)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pet-logs notepad">
          <div className="log-box">
            <h3>Medication logs for {petDetails.petName}</h3>
            <ul>
              {petMedicationLogs.map((medicationLog) => (
                <li key={medicationLog.medicationLogId}>
                  Takes {medicationLog.medicationName}{" "}
                  {medicationLog.instructions} for{" "}
                  {medicationLog.durationInDays} days
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
