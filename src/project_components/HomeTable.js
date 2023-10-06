import React from "react";
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
  const rows = [
    {
      data1: "Max",
      data2: "Brown",
      data3: "Labrador Retriever",
      data4: "Male",
      data5: "01/15/2018",
      data6: "75 lbs",
      data7: "Yes",
      data8: "Dog",
      data9: "None",
    },
    {
      data1: "Bella",
      data2: "White",
      data3: "Poodle",
      data4: "Female",
      data5: "04/22/2019",
      data6: "10 lbs",
      data7: "No",
      data8: "Dog",
      data9: "Pollen",
    },
    {
      data1: "Charlie",
      data2: "Black",
      data3: "German Shepherd",
      data4: "Male",
      data5: "08/05/2017",
      data6: "80 lbs",
      data7: "Yes",
      data8: "Dog",
      data9: "Dust",
    },
  ];

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: "90%", maxHeight: "100%", margin: auto }}
    >
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Breed</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Insurance</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Allergies</TableCell>
            <TableCell align="right" colSpan={2}>
              <Button variant="contained" color="primary">
                Add a Pet
              </Button>
              <Button variant="contained" color="primary">
                Remove a Pet
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.data1}</TableCell>
              <TableCell>{row.data2}</TableCell>
              <TableCell>{row.data3}</TableCell>
              <TableCell>{row.data4}</TableCell>
              <TableCell>{row.data5}</TableCell>
              <TableCell>{row.data6}</TableCell>
              <TableCell>{row.data7}</TableCell>
              <TableCell>{row.data8}</TableCell>
              <TableCell>{row.data9}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
