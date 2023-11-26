import React from "react";
import "../css/Navbar.css"; // Import your CSS file
import { Button } from "@mui/material";
import LogoutButton from "../components/logout.js";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/home" className="navbar-logo">
          <h2>Pet Logger</h2>
        </a>
        <ul className="nav-menu">
          <li className="nav-item">
            <Button
              style={{ color: "white" }}
              href="/Checklist"
              className="nav-links"
            >
              Pet Errands todo
              Add to ChecklistS
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
              Find Vets Near You
            </Button>
          </li>
          <li>
          <Button
        href="/AboutUs"
        className="nav-links"
        style={{color: "white"}}
      >
        About Us
      </Button>
      </li>
          <Avatar style={{ fontSize: "8px" }} variant="contained">
            <LogoutButton />
          </Avatar>
          <LogoutButton />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
