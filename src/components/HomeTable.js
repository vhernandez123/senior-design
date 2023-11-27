import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

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
      style={{
        maxWidth: "90%",
        maxHeight: "100%",
        margin: "auto",
        backgroundColor: "rgba(136, 206, 146, 0.90)",
      }}
    >
      <TextField label="Search" style={{ margin: "1rem" }} />
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
            <TableCell className="table-header-cell" colSpan={2}>
              Actions
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
              <TableCell className="table-cell" colSpan={2}>
                <Button
                  variant="contained"
                  className="custom-button"
                  style={{
                    backgroundColor: "#01B636",
                    color: "white",
                    marginRight: "10px", 
                  }}
                  onClick={() => handleRemovePet(index, row.petId)}
                >
                  Remove
                </Button>
                <Link to={`/pet/${row.petId}`}>
                  <Button
                    variant="contained"
                    className="custom-button"
                    style={{
                      backgroundColor: "#01B636",
                      color: "white",
                      marginLeft: "10px", 
                    }}
                  >
                    View Pet
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        component={Link}
        to="/AddPet"
        variant="contained"
        className="custom-button custom-table"
        style={{ margin: "1rem", backgroundColor: "#01B636", color: "white" }}
      >
        Add New Pet
      </Button>
    </TableContainer>
  );
};

export default DataTable;
