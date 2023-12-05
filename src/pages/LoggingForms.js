import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../css/PetDetails.css";
import Navbar from "../components/navbar";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import jsPDF from "jspdf";

const LoggingForms = () => {
  const { petID, logsID } = useParams();
  const [userID, setUserId] = useState(null);
  const { user, getIdTokenClaims } = useAuth0();
  const [petDetails, setPetDetails] = useState({});
  const [petLogs, setPetLogs] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);
  const [bathroomLogs, setBathroomLogs] = useState([]);
  const [medicationLogs, setMedicationLogs] = useState([]);
  const [behaviorLogs, setPetBehaviorLogs] = useState([]);

  const formatLogDate = (logDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(logDate).toLocaleDateString(undefined, options);
  };

  const handleExportToPdf = () => {
    const { petName, petBreed, petAge, petColor, petWeight, petMicrochipNum } =
      petDetails;

    const currentDate = new Date().toLocaleDateString();

    const formattedLogs = {
      petLogs: petLogs.map((log) => ({
        logEntry: log.logEntry,
        logDate: formatLogDate(log.logDate),
      })),
      behaviorLogs: behaviorLogs?.map((behaviorLog) => ({
        activity: behaviorLog.behaviorActivity,
        aggression: behaviorLog.behaviorAggression === "yes" ? "Yes" : "No",
        behaviorChanges: behaviorLog.behaviorChanges,
      })),
      medicationLogs: medicationLogs?.map((medicationLog) => ({
        medicationName: medicationLog.medicationName,
        medicationDosage: medicationLog.medicationDosage,
        instructions: medicationLog.medicationInstructions,
        durationInDays: medicationLog.medicationDuration,
      })),
    };

    const petInfoText = `Pet Information:
      Name: ${petName}
      Breed: ${petBreed}
      Age: ${petAge}
      Color: ${petColor}
      Weight: ${petWeight}
      Microchip Number: ${petMicrochipNum}
      Date Of log: ${currentDate}`;

    const logsText = `
        Daily Log:
      ${formattedLogs.petLogs
        ?.map((log) => `${log.logDate}: ${log.logEntry}`)
        .join("\n")}
        Behavior Logs:
      ${formattedLogs.petBehaviorLogs
        ?.map(
          (behaviorLog) =>
            `Current Activity: ${behaviorLog.activity}, Any signs of aggression: ${behaviorLog.aggression}, Behavior Changes: ${behaviorLog.behaviorChanges}, Logged on ${behaviorLog.logDate}`
        )
        .join("\n")}
        Medication Logs:
      ${formattedLogs.medicationLogs
        ?.map(
          (medicationLog) =>
            `Takes ${medicationLog.medicationName} ${medicationLog.instructions} for ${medicationLog.durationInDays} days`
        )
        .join("\n")}
    `;

    const fullText = `${petInfoText}${logsText}`;

    const pdf = new jsPDF();
    pdf.text(fullText, 10, 10);
    pdf.save(`pet_data_${petDetails.petName}_${currentDate}.pdf`);
  };

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
    const fetchData = async () => {
      try {
        const petDetailsResponse = await Axios.get(
          `http://localhost:4000/GetPet/${petID}`
        );
        const petLogsResponse = await Axios.get(
          `http://localhost:4000/GetLog/${logsID}`
        );
        // const bathroomLogsResponse = await Axios.get(
        //   `http://localhost:4000/GetBathroomLogsByPetID/${petID}`
        // );
        // const foodLogsResponse = await Axios.get(
        //   `http://localhost:4000/GetFoodLogsByPetID/${petID}`
        // );
        // const behaviorLogsResponse = await Axios.get(
        //   `http://localhost:4000/GetBehaviorogsByPetID/${petID}`
        // );
        // const medicationLogsResponse = await Axios.get(
        //   `http://localhost:4000/GetMedicationLogsByPetID/${petID}`
        // );

        const bathroomLogsResponse = await Axios.get(
          `http://localhost:4000/GetBathroomDetailsbyLogID/${logsID}`
        );
        const foodLogsResponse = await Axios.get(
          `http://localhost:4000/GetFoodLogsByLogID/${logsID}`
        );
        const behaviorLogsResponse = await Axios.get(
          `http://localhost:4000/GetBehaviorDetailsbyLogID/${logsID}`
        );
        const medicationLogsResponse = await Axios.get(
          `http://localhost:4000/GetMedicationDetailsbyLogID/${logsID}`
        );

        setPetDetails(petDetailsResponse.data);
        setBathroomLogs(bathroomLogsResponse.data);
        setPetBehaviorLogs(behaviorLogsResponse.data);
        setMedicationLogs(medicationLogsResponse.data);
        setPetLogs(petLogsResponse.data);
        setFoodLogs(foodLogsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log(logsID);
      }
    };

    fetchData();
  }, [petID, logsID]);

  return (
    <div>
      <Navbar />
      <div className="pet-details-container">
        <div className="pet-info">
          <h2 className="pet-name">{petDetails.petName}</h2>
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
      <div className="pet-details-container-forms1">
        <h3>What has your pet eaten today?</h3>
        <Link to={`/log-food/${logsID}/${petID}`}>
          <Button
            variant="contained"
            className="pet-details-item "
            style={{ backgroundColor: "#01B636", color: "white",margin:"10px" }}
          >
            Log Food
          </Button>
        </Link>
        <br />
        <br />
        <h3>Concerned about your pet?</h3>
        <Link to={`/UpdateBathroom/${logsID}/${petID}`}>
          <Button
            variant="contained"
            className="pet-details-item "
            style={{ backgroundColor: "#01B636", color: "white",margin:"10px" }}
          >
            Click Here
          </Button>
        </Link>

        <br />
        <br />
        <h3>Does your pet take any medication?</h3>

        <Link to={`/LogMedication/${logsID}/${petID}`}>
          <Button
            variant="contained"
            className="pet-details-item "
            style={{ backgroundColor: "#01B636", color: "white",margin:"10px" }}
          >
            Log it Here
          </Button>
        </Link>
      </div>
      <div className="pet-logs-container">
      <div className="pet-logs notepad">
        <div className="log-box">
          <h3>Daily log for {petDetails.petName}</h3>
          <ul>
            {petLogs.map((log) => (
              <li key={log.logsId}>{log.logEntry}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pet-logs notepad">
        <div className="log-box">
          <h3>Food logs for {petDetails.petName}</h3>
          <ul>
            {foodLogs.map((foodDetails) => (
              <li key={foodDetails.foodID}>
                Ate {foodDetails.foodAmount}
                {""}
                {foodDetails.foodUnit} {""}
                of {foodDetails.foodType}. Drank {foodDetails.foodWater} times.
                {foodDetails.foodDanger === "yes" ? (
                  <span>
                    {" "}
                    Ate something bad: {foodDetails.foodDangerDescription}
                  </span>
                ) : (
                  <span> Did not eat something bad</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pet-logs notepad">
        <div className="log-box">
          <h3>Bathroom/Illness logs for {petDetails.petName}</h3>
          <ul>
            {bathroomLogs.map((bathroomLog) => (
              <li key={bathroomLog.bathroomID}>
                <p>
                  Used Bathroom {bathroomLog.bathroomNumber} times. Poop
                  Description: {bathroomLog.bathroomPoop}. Urine Description:{" "}
                  {bathroomLog.bathroomUrine}. Vomit Count:{" "}
                  {bathroomLog.bathroomVomit}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pet-logs notepad">
        <div className="log-box">
          <h3>Behavior logs for {petDetails.petName}</h3>
          <ul>
            {behaviorLogs.map((behaviorLog) => (
              <li key={behaviorLog.behaviorID}>
                <p>
                  Current Activity: {behaviorLog.behaviorActivity}, Any signs of
                  aggression:{" "}
                  {behaviorLog.behaviorAggression === "yes" ? "Yes" : "No"},
                  Behavior Changes: {behaviorLog.behaviorChanges}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pet-logs notepad">
        <div className="log-box">
          <h3>Medication logs for {petDetails.petName}</h3>
          <ul>
            {medicationLogs.map((medicationLog) => (
              <li key={medicationLog.medicationLogId}>
                Takes {medicationLog.medicationDosage} of{" "}
                {medicationLog.medicationName} for{" "}
                {medicationLog.medicationDuration} days. Instructions:
                {medicationLog.medicationInstructions}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoggingForms;
