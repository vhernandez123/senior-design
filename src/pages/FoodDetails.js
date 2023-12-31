import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "../css/PetDetails.css";
import Navbar from "../components/navbar";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import DataTable from "../components/LogTable";

const PetDetails = () => {
    const [petDetails, setPetDetails] = useState({});
    const [petLogs, setPetLogs] = useState([]);
    const { petID } = useParams();
  
    const formatLogDate = (logDate) => {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(logDate).toLocaleDateString(undefined, options);
    };
  
    useEffect(() => {
      Axios.get(`http://localhost:4000/GetPet/${petID}`)
        .then((response) => {
          setPetDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching pet details:", error);
        });
  
      Axios.get(`http://localhost:4000/GetLogsByPetID/${petID}`)
        .then((response) => {
          setPetLogs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching pet logs:", error);
        });
  
      // Axios.get(`http://localhost:4000/GetIllnessLogsByPetID/${petID}`)
      //   .then((response) => {
      //     setPetIllnessLogs(response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching pet illness logs:", error);
      //   });
  
      // Axios.get(`http://localhost:4000/GetMedicationLogsByPetID/${petID}`)
      //   .then((response) => {
      //     setPetMedicationLogs(response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching pet medication logs:", error);
      //   });
  
      // Axios.get(`http://localhost:4000/GetBehaviorLogsByPetID/${petID}`)
      //   .then((response) => {
      //     setPetBehaviorLogs(response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching pet behavior logs:", error);
      //   });
  
      console.log(petID);
    }, [petID]);
  
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
            </div>
            <h3>Log Information about your pet</h3>
            <Link to={`/log-pet/${petID}`}>
              <Button
                variant="contained"
                className="custom-button"
                style={{ backgroundColor: "#01B636", color: "white" }}
              >
                Create New Log
              </Button>
            </Link>
            <br />
            <br />
            <h4>Export info to PDF</h4>
            <Button
              variant="contained"
              className="custom-button"
              style={{ backgroundColor: "#01B636", color: "white" }}
              onClick={handleExportToPdf}
            >
              Export to PDF
            </Button>
          </div>
        </div>
        <div><DataTable /></div>
        {/* <div className="pet-logs notepad">
        < div className="log-box">
            <h3>Daily Logs for {petDetails.petName}</h3>
            <ul>
              {petLogs.map((log) => (
                <li key={log.logsId}>
                  {log.logEntry} on {formatLogDate(log.logDate)}
                </li>
              ))}
            </ul>  
          </div>
        </div> */}
        {/* <div className="pet-logs notepad">
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
        <div className="pet-logs notepad">
          <div className="log-box">
            <h3>Behavior logs for {petDetails.petName}</h3>
            <ul>
              {petBehaviorLogs.map((behaviorLog) => (
                <li key={behaviorLog.behaviorLogId}>
                  <p>
                    Current Activity: {behaviorLog.activity}, Any signs of
                    aggression: {behaviorLog.aggression === "yes" ? "Yes" : "No"},
                    Behavior Changes: {behaviorLog.behaviorChanges}
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
                  {medicationLog.instructions} for {medicationLog.durationInDays}{" "}
                  days
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    );
  };
  export default PetDetails;
  