import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../css/PetDetails.css";
import Navbar from "../components/navbar";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";

const LoggingForms = () => {
  const { petID, logsID } = useParams();
  const [userID, setUserId] = useState(null);
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

  return (
    <div>
      <Navbar />
      <div className="pet-details-container">
        <h3>What has your pet eaten today?</h3>
        <Link to={`/log-food/${logsID}/${petID}/${userID}`}>
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
