import React, { useState, useEffect } from "react";
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
<<<<<<< HEAD
    const { petName, petBreed, petAge, petColor, petWeight, petMicrochipNum } = petDetails;
=======
    const {
      petName,
      petBreed,
      petAge,
      petColor,
      petWeight,
      petMicrochipNum,
      petGender,
    } = petDetails;
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
    const currentDate = new Date().toLocaleDateString();

    const formattedLogs = {
      petLogs: petLogs.map((log) => ({ logEntry: log.logEntry, logDate: formatLogDate(log.logDate) })),
      foodLogs: foodLogs.map((foodDetails) => ({
        foodEntry: `Ate ${foodDetails.foodAmount} ${foodDetails.foodUnit} of ${foodDetails.foodType}. Drank ${foodDetails.foodWater} times.`,
        foodDanger:
          foodDetails.foodDanger === "yes"
            ? `Ate something bad: ${foodDetails.foodDangerDescription}`
            : "Did not eat something bad",
      })),
      bathroomLogs: bathroomLogs.map((bathroomLog) => ({
        bathroomEntry: `Used Bathroom ${bathroomLog.bathroomNumber} times. Poop Description: ${bathroomLog.bathroomPoop}. Urine Description: ${bathroomLog.bathroomUrine}. Vomit Count: ${bathroomLog.bathroomVomit}`,
      })),
<<<<<<< HEAD
      behaviorLogs: behaviorLogs.map((behaviorLog) => ({
        behaviorEntry: `Current Activity: ${behaviorLog.behaviorActivity}, Any signs of aggression: ${
          behaviorLog.behaviorAggression === "yes" ? "Yes" : "No"
        }, Behavior Changes: ${behaviorLog.behaviorChanges}`,
        behaviorDate: formatLogDate(behaviorLog.logDate),
      })),
=======
      foodLogs: foodLogs.map((foodDetails) => ({
        foodEntry: `Ate ${foodDetails.foodAmount} ${foodDetails.foodUnit} of ${foodDetails.foodType}. Drank ${foodDetails.foodWater} times.`,
        foodDanger:
          foodDetails.foodDanger === "yes"
            ? `Ate something bad: ${foodDetails.foodDangerDescription}`
            : "Did not eat something bad",
      })),
      bathroomLogs: bathroomLogs.map((bathroomLog) => ({
        bathroomEntry: `Used Bathroom ${bathroomLog.bathroomNumber} times. Poop Description: ${bathroomLog.bathroomPoop}. Urine Description: ${bathroomLog.bathroomUrine}. Vomit Count: ${bathroomLog.bathroomVomit}`,
      })),
      behaviorLogs: behaviorLogs.map((behaviorLog) => ({
        behaviorEntry: `Current Activity: ${
          behaviorLog.behaviorActivity
        }, Any signs of aggression: ${
          behaviorLog.behaviorAggression === "yes" ? "Yes" : "No"
        }, Behavior Changes: ${behaviorLog.behaviorChanges}`,
        behaviorDate: formatLogDate(currentDate),
      })),
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
      medicationLogs: medicationLogs.map((medicationLog) => ({
        medicationEntry: `Takes ${medicationLog.medicationDosage} of ${medicationLog.medicationName} for ${medicationLog.medicationDuration} days. Instructions: ${medicationLog.medicationInstructions}`,
      })),
    };

    const pdf = new jsPDF();
    const margin = 15;
    let yPosition = margin;
<<<<<<< HEAD

    const addText = (text, color = "#000000", fontSize = 12) => {
      pdf.setFontSize(fontSize);
      pdf.setTextColor(color);

      const margin = 10;
      const pageWidth = pdf.internal.pageSize.width;
      const remainingWidth = pageWidth - margin * 2;

      const lines = pdf.splitTextToSize(text ?? "N/A", remainingWidth);
      const lineHeight = fontSize / pdf.internal.scaleFactor;

=======

    const addText = (text, color = "#000000", fontSize = 12) => {
      pdf.setFontSize(fontSize);
      pdf.setTextColor(color);

      const margin = 10;
      const pageWidth = pdf.internal.pageSize.width;
      const remainingWidth = pageWidth - margin * 2;

      const lines = pdf.splitTextToSize(text ?? "N/A", remainingWidth);
      const lineHeight = fontSize / pdf.internal.scaleFactor;

>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
      for (let i = 0; i < lines.length; i++) {
        if (yPosition + lineHeight > pdf.internal.pageSize.height - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.text(margin, yPosition, lines[i]);
        yPosition += lineHeight;
      }
    };

    addText(`Name: ${petName}`);
    addText(`Breed: ${petBreed || "N/A"}`);
<<<<<<< HEAD
=======
    addText(`Gender: ${petGender || "N/A"}`);
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
    addText(`Age: ${petAge || "N/A"}`);
    addText(`Color: ${petColor || "N/A"}`);
    addText(`Weight: ${petWeight || "N/A"}`);
    addText(`Microchip Number: ${petMicrochipNum || "N/A"}`);
    addText(`Date Of Log: ${currentDate}`);
    yPosition += 10;

    addText("Daily Log", "#01B636", 16);
    formattedLogs.petLogs.forEach((log) =>
      addText(`${log.logDate}: ${log.logEntry || "No entry for this date."}`)
    );
    yPosition += 10;

    addText("Food Logs", "#01B636", 16);
    formattedLogs.foodLogs.forEach((foodLog) => {
      addText(
        `Ate ${foodLog.foodAmount || "N/A"} ${foodLog.foodUnit || "N/A"} of ${
          foodLog.foodType || "N/A"
        }.`
      );
      addText(
        foodLog.foodWater
          ? `Drank ${foodLog.foodWater} times.`
          : "No information about drinking."
      );
      addText(
        foodLog.foodDanger === "yes"
<<<<<<< HEAD
          ? `Ate something bad: ${foodLog.foodDangerDescription || "No description."}`
=======
          ? `Ate something bad: ${
              foodLog.foodDangerDescription || "No description."
            }`
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
          : "Did not eat something bad."
      );
    });
    yPosition += 10;

    addText("Bathroom/Illness Logs", "#01B636", 16);
    formattedLogs.bathroomLogs.forEach((bathroomLog) => {
<<<<<<< HEAD
      addText(
        `Used Bathroom ${bathroomLog.bathroomNumber || "N/A"} times.`
      );
=======
      addText(`Used Bathroom ${bathroomLog.bathroomNumber || "N/A"} times.`);
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
      addText(
        bathroomLog.bathroomPoop
          ? `Poop Description: ${bathroomLog.bathroomPoop}`
          : "No information about poop."
      );
      addText(
        bathroomLog.bathroomUrine
          ? `Urine Description: ${bathroomLog.bathroomUrine}`
          : "No information about urine."
      );
      addText(
        bathroomLog.bathroomVomit
          ? `Vomit Count: ${bathroomLog.bathroomVomit}`
          : "No information about vomiting."
      );
    });
    yPosition += 10;

    addText("Behavior Logs", "#01B636", 16);
    formattedLogs.behaviorLogs.forEach((behaviorLog) => {
<<<<<<< HEAD
      addText(
        `Current Activity: ${behaviorLog.activity || "N/A"}`
      );
=======
      addText(`Current Activity: ${behaviorLog.activity || "N/A"}`);
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
      addText(
        `Any signs of aggression: ${
          behaviorLog.aggression === "yes" ? "Yes" : "No"
        }`
      );
<<<<<<< HEAD
      addText(
        `Behavior Changes: ${behaviorLog.behaviorChanges || "N/A"}`
      );
      addText(
        `Logged on ${behaviorLog.behaviorDate || "N/A"}`
      );
=======
      addText(`Behavior Changes: ${behaviorLog.behaviorChanges || "N/A"}`);
      addText(`Logged on ${behaviorLog.behaviorDate || "N/A"}`);
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
    });
    yPosition += 10;

    addText("Medication Logs", "#01B636", 16);
    formattedLogs.medicationLogs.forEach((medicationLog) => {
      addText(
        `Takes ${medicationLog.medicationDosage || "N/A"} of ${
          medicationLog.medicationName || "N/A"
        } for ${medicationLog.medicationDuration || "N/A"} days.`
      );
      addText(
        medicationLog.medicationInstructions
          ? `Instructions: ${medicationLog.medicationInstructions}`
          : "No instructions provided."
      );
    });
    yPosition += 10;

    pdf.save(`pet_data_${petName}_${currentDate}.pdf`);
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
<<<<<<< HEAD
        const petDetailsResponse = await Axios.get(`http://localhost:4000/GetPet/${petID}`);
        const petLogsResponse = await Axios.get(`http://localhost:4000/GetLog/${logsID}`);
        const bathroomLogsResponse = await Axios.get(`http://localhost:4000/GetBathroomDetailsbyLogID/${logsID}`);
        const foodLogsResponse = await Axios.get(`http://localhost:4000/GetFoodLogsByLogID/${logsID}`);
        const behaviorLogsResponse = await Axios.get(`http://localhost:4000/GetBehaviorDetailsbyLogID/${logsID}`);
        const medicationLogsResponse = await Axios.get(`http://localhost:4000/GetMedicationDetailsbyLogID/${logsID}`);
=======
        const petDetailsResponse = await Axios.get(
          `http://localhost:4000/GetPet/${petID}`
        );
        const petLogsResponse = await Axios.get(
          `http://localhost:4000/GetLog/${logsID}`
        );

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
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897

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
<<<<<<< HEAD
            style={{ backgroundColor: "#01B636", color: "white", margin: "10px" }}
=======
            style={{
              backgroundColor: "#01B636",
              color: "white",
              margin: "10px",
            }}
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
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
<<<<<<< HEAD
            style={{ backgroundColor: "#01B636", color: "white", margin: "10px" }}
=======
            style={{
              backgroundColor: "#01B636",
              color: "white",
              margin: "10px",
            }}
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
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
<<<<<<< HEAD
            style={{ backgroundColor: "#01B636", color: "white", margin: "10px" }}
=======
            style={{
              backgroundColor: "#01B636",
              color: "white",
              margin: "10px",
            }}
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
          >
            Log it Here
          </Button>
        </Link>
      </div>
<<<<<<< HEAD
      <div className="pet-logs-container">
=======
      <div className="pet-details-container logsAppear1">
      <div className="pet-logs-container logsApp">
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
        <div className="pet-logs notepad">
          <div className="log-box">
            <h3>Daily log for {petDetails.petName}</h3>
            <ul>
              {petLogs.map((log) => (
<<<<<<< HEAD
                <li key={log.logsId}>
                  {log.logEntry || "No entry for this date."}
                </li>
=======
                <li key={log.logsId}>{log.logEntry}</li>
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
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
<<<<<<< HEAD
                  Ate {foodDetails.foodAmount || "N/A"}{" "}
                  {foodDetails.foodUnit || "N/A"} of{" "}
                  {foodDetails.foodType || "N/A"}.{" "}
                  {foodDetails.foodWater
                    ? `Drank ${foodDetails.foodWater} times.`
                    : "No information about drinking."}{" "}
                  {foodDetails.foodDanger === "yes" ? (
                    <span>
                      {" "}
                      Ate something bad:{" "}
                      {foodDetails.foodDangerDescription || "No description."}
                    </span>
                  ) : (
                    <span> Did not eat something bad.</span>
=======
                  Ate {foodDetails.foodAmount}
                  {""}
                  {foodDetails.foodUnit} {""}
                  of {foodDetails.foodType}. Drank {foodDetails.foodWater}{" "}
                  times.
                  {foodDetails.foodDanger === "yes" ? (
                    <span>
                      {" "}
                      Ate something bad: {foodDetails.foodDangerDescription}
                    </span>
                  ) : (
                    <span> Did not eat something bad</span>
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
<<<<<<< HEAD
        <div className="pet-logs notepad">
=======
      </div>
      <div className="pet-logs-container logsAppear">
      <div className="pet-logs notepad">
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
          <div className="log-box">
            <h3>Bathroom/Illness logs for {petDetails.petName}</h3>
            <ul>
              {bathroomLogs.map((bathroomLog) => (
                <li key={bathroomLog.bathroomID}>
                  <p>
<<<<<<< HEAD
                    Used Bathroom{" "}
                    {bathroomLog.bathroomNumber || "N/A"} times. Poop
                    Description: {bathroomLog.bathroomPoop || "N/A"}. Urine
                    Description: {bathroomLog.bathroomUrine || "N/A"}. Vomit
                    Count: {bathroomLog.bathroomVomit || "N/A"}
=======
                    Used Bathroom {bathroomLog.bathroomNumber} times. Poop
                    Description: {bathroomLog.bathroomPoop}. Urine Description:{" "}
                    {bathroomLog.bathroomUrine}. Vomit Count:{" "}
                    {bathroomLog.bathroomVomit}
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
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
<<<<<<< HEAD
                    Current Activity: {behaviorLog.activity || "N/A"}{" "}
                    Any signs of aggression:{" "}
                    {behaviorLog.aggression === "yes" ? "Yes" : "No"}{" "}
                    Behavior Changes: {behaviorLog.behaviorChanges || "N/A"}{" "}
                    Logged on {behaviorLog.behaviorDate || "N/A"}
=======
                    Current Activity: {behaviorLog.behaviorActivity}, Any signs
                    of aggression:{" "}
                    {behaviorLog.behaviorAggression === "yes" ? "Yes" : "No"},
                    Behavior Changes: {behaviorLog.behaviorChanges}
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
<<<<<<< HEAD

=======
        </div></div>
      <div className="pet-logs-container meds">
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
        <div className="pet-logs notepad">
          <div className="log-box">
            <h3>Medication logs for {petDetails.petName}</h3>
            <ul>
              {medicationLogs.map((medicationLog) => (
                <li key={medicationLog.medicationLogId}>
<<<<<<< HEAD
                  Takes {medicationLog.medicationDosage || "N/A"} of{" "}
                  {medicationLog.medicationName || "N/A"} for{" "}
                  {medicationLog.medicationDuration || "N/A"} days.{" "}
                  {medicationLog.medicationInstructions
                    ? `Instructions: ${medicationLog.medicationInstructions}`
                    : "No instructions provided."}
=======
                  Takes {medicationLog.medicationDosage} of{" "}
                  {medicationLog.medicationName} for{" "}
                  {medicationLog.medicationDuration} days. Instructions:
                  {medicationLog.medicationInstructions}
>>>>>>> 321162a41265619bf269df0a49ed1491c1ae0897
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
