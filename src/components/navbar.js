import React from "react";
import "../css/Navbar.css"; // Import your CSS file
import { Button } from "@mui/material";
import LogoutButton from "../components/logout.js";
import { useAuth0 } from "@auth0/auth0-react";
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
              Find Vets Now
            </Button>
          </li>
          <LogoutButton />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
