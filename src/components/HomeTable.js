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

const DataTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/GetAllPets")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
      });
  }, []);

  const handleRemovePet = (index, petId) => {
    Axios.delete(`http://localhost:4000/RemovePet/${petId}`)
      .then((response) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
      })
      .catch((error) => {
        console.error("Error removing pet:", error);
      });
  };

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
            <TableCell className="table-header-cell">Actions</TableCell>
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
              <TableCell className="table-cell">
                <Button
                  variant="contained"
                  className="custom-button"
                  onClick={() => handleRemovePet(index, row.petId)}
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

export default DataTable;