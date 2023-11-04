import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "../css/PetDetails.css";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Button } from "@mui/material";

const PetDetails = () => {
  const [petDetails, setPetDetails] = useState({});
  const { petId } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:4000/GetPet/${petId}`)
      .then((response) => {
        setPetDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
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
            <Button
              href="/LogPet"
              variant="contained"
              className="custom-button"
              style={{ backgroundColor: "#01B636", color: "white" }}
            >
              Log Pet Information
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PetDetails;
