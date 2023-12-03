import React from "react";
import "../css/PetDetails.css";
import Navbar from "../components/navbar";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const LoggingForms = () => {
  const { petID, logsID } = useParams();

  return (
    <div>
      <Navbar />
      <div className="pet-details-container">
        <h3>What has your pet eaten today?</h3>
        <Link to={`/log-food/${logsID}/${petID}`}>
          <Button
            variant="contained"
            className="custom-button"
            style={{ backgroundColor: "#01B636", color: "white" }}
          >
            Log Food
          </Button>
        </Link>

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
  );
};

export default LoggingForms;
