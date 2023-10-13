import React from "react";
import "../css/Navbar.css"; // Import your CSS file
import { Avatar, Button } from "@mui/material";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Pet Logger</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <Button
              style={{ color: "white" }}
              href="/Checklist"
              className="nav-links"
            >
              Add to Checklist
            </Button>
          </li>
          <li className="nav-item">
            <Button
              style={{ color: "white" }}
              href="/Schedule"
              className="nav-links"
            >
              Schedule Appointment
            </Button>
          </li>
          <li className="nav-item">
            <Button
              style={{ color: "white" }}
              href="/findvets"
              className="nav-links"
            >
              Find Vets Now
            </Button>
          </li>
          <Avatar style={{ fontSize: "15px" }} variant="contained">
            Login
          </Avatar>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;