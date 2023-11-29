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
            </Button>
          </li>
          <li className="nav-item">
            <Button
              style={{ color: "white" }}
              href="/VetFinder"
              className="nav-links"
            >
              Find Vets Near You
            </Button>
          </li>
      <li>
      <LogoutButton />
      </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;