import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { auto } from "@popperjs/core";
import { getLibraries, getNearbyPlaces } from '../api/index';


const PlacesList = () => {
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [places, setPlaces] = useState([]);
    const [rating, setRating] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const [coordinates, setCoordinates] = useState({
        lat: 42.687532,
        lng: -83.234103
    });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getNearbyPlaces(coordinates.lat, coordinates.lng)
        .then((data) => {
          setPlaces(data.filter((place) => place.displayName));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
          setRows(data);
        });
  }, []);

  const handleClick = (index, place_id) => {

  };

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: "90%", maxHeight: "100%", margin: "auto" }}
    >
      <Table size="medium" className="custom-table">
        <TableHead>
          <TableRow className="table-header-row">
          <TableCell className="table-header-cell">Photo</TableCell>
            <TableCell className="table-header-cell">Name</TableCell>
            <TableCell className="table-header-cell">Address</TableCell>
            <TableCell className="table-header-cell">Rating</TableCell>
            <TableCell className="table-header-cell">Phone Number</TableCell>
            <TableCell className="table-header-cell">Website</TableCell>
            <TableCell className="table-header-cell">Price Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} className="table-row">
            <TableCell className="table-cell">{row.photos}</TableCell>
              <TableCell className="table-cell">{row.displayName}</TableCell>
              <TableCell className="table-cell">{row.formattedAddress}</TableCell>
              <TableCell className="table-cell">{row.rating}</TableCell>
              <TableCell className="table-cell">{row.formatted_phone_number}</TableCell>
              <TableCell className="table-cell">{row.website}</TableCell>
              <TableCell className="table-cell">{row.price_level}</TableCell>
              <TableCell className="table-cell">
                <Button
                  variant="contained"
                  className="custom-button"
                  onClick={() => handleClick(index, row.petId)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        href="/AddPet"
        variant="contained"
        className="custom-button"
        style={{ margin: "1rem" }}
      >
        Add New Pet
      </Button>
    </TableContainer>
  );
};

export default PlacesList;