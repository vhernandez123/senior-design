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

const DataTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint when the component mounts
    Axios.get("http://localhost:4000/GetAllPets")
      .then((response) => {
        // Assuming your API returns an array of pet data
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
      });
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: "90%", maxHeight: "100%", margin: "auto" }}
    >
      <Table size="medium" className="custom-table">
        <TableHead>
          <TableRow className="table-header-row">
            <TableCell className="table-header-cell">Name</TableCell>
            <TableCell className="table-header-cell">Breed</TableCell>
            <TableCell className="table-header-cell">Age</TableCell>
            <TableCell className="table-header-cell">Color</TableCell>
            <TableCell className="table-header-cell">Weight</TableCell>
            <TableCell className="table-header-cell">
              Microchip Number
            </TableCell>
            <TableCell className="table-header-cell">Food</TableCell>
            <TableCell className="table-header-cell" align="right" colSpan={2}>
              <Button
                href="/AddPet"
                variant="contained"
                className="custom-button"
              >
                Add New Pet
              </Button>
              <Button variant="contained" className="custom-button">
                Remove a Pet
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} className="table-row">
              <TableCell className="table-cell">{row.petName}</TableCell>
              <TableCell className="table-cell">{row.petBreed}</TableCell>
              <TableCell className="table-cell">{row.petAge}</TableCell>
              <TableCell className="table-cell">{row.petColor}</TableCell>
              <TableCell className="table-cell">{row.petWeight}</TableCell>
              <TableCell className="table-cell">
                {row.petMicrochipNum}
              </TableCell>
              <TableCell className="table-cell">{row.petFood}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
