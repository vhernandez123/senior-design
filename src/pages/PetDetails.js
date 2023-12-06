import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "../css/PetDetails.css";
import Navbar from "../components/navbar";
import DataTable from "../components/LogTable";

const PetDetails = () => {
  const [petDetails, setPetDetails] = useState({});
  const [petLogs, setPetLogs] = useState([]);

  const { petID } = useParams();

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
              <span className="property-label">Gender:</span>{" "}
              {petDetails.petGender}
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
        </div>
      </div>
      <div>
        <DataTable />
      </div>
    </div>
  );
};
export default PetDetails;
