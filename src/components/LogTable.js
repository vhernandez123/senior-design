import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
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
import { useParams } from "react-router-dom";

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const { user, getIdTokenClaims } = useAuth0();
  const [userId, setUserId] = useState(null);
  const { petID } = useParams();
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
      if (user && userId) {
        try {
          const response = await Axios.get(
            `http://localhost:4000/GetLogsByPetId/${petID}`
          );
          // console.log(response.data);
          setRows(response.data);
        } catch (error) {
          console.error("Error finding pet info for this owner:", error);
        }
      }
    };

    fetchData();
  }, [userId, user,]);

//   const handleRemovePet = (index, petID) => {
//     Axios.delete(`http://localhost:4000/RemovePet/${petID}`)
//       .then((response) => {
//         const updatedRows = [...rows];
//         updatedRows.splice(index, 1);
//         setRows(updatedRows);
//       })
//       .catch((error) => {
//         console.error("Error removing pet:", error);
//       });
//   };

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
            {/* <TableCell className="table-header-cell">LogsID</TableCell> */}
            <TableCell className="table-header-cell">Date</TableCell>
            <TableCell className="table-header-cell">Log Entry</TableCell>
            <TableCell className="table-header-cell" colSpan={2}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} className="table-row">
              {/* <TableCell className="table-cell">{row.logsID}</TableCell> */}
              <TableCell className="table-cell">{row.logDate}</TableCell>
              <TableCell className="table-cell">{row.logEntry}</TableCell>
              <TableCell className="table-cell" colSpan={2}>
                {/* <Button
                  variant="contained"
                  className="custom-button"
                  style={{
                    backgroundColor: "#01B636",
                    color: "white",
                    marginRight: "10px",
                  }}
                  onClick={() => handleRemovePet(index, row.petID)}
                >
                  Remove
                </Button> */}
                <Link to={`/LoggingForms/${row.logsID}/${petID}`}>
                  <Button
                    variant="contained"
                    className="custom-button"
                    style={{
                      backgroundColor: "#01B636",
                      color: "white",
                      marginLeft: "10px",
                    }}
                  >
                    Details
                  </Button>
                </Link>
                {/* <Link to={`/LoggingForms/${row.logsID}/${petID}`}>
                  <Button
                    variant="contained"
                    className="custom-button"
                    style={{
                      backgroundColor: "#01B636",
                      color: "white",
                      marginLeft: "10px",
                    }}
                  >
                    View Details
                  </Button>
                </Link> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        component={Link}
        to={`/Log-pet/${petID}`}
        variant="contained"
        className="custom-button custom-table"
        style={{ margin: "1rem", backgroundColor: "#01B636", color: "white" }}
      >
        Add New Log
      </Button>
    </TableContainer>
  );
};

export default DataTable;
