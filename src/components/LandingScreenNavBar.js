import React from "react";
import "../css/LandingScreenNavBar.css";
import AboutUs from "../components/aboutUs.js";
import { Button } from "@mui/material";
function LandingScreenNavBar() {
  return (
    <nav className="navbar">
    <div className="navbar-container">
      <h1 className="navbar-logo">Pet Logger</h1>
      <ul className="nav-menu">
        <li className="nav-item">
        <Button
        href="/AboutUs"
        variant="contained"
        className="custom-button"
        style={{ margin: "1rem" }}
      >
        About Us
      </Button>
        </li>
        <li className="nav-item">
          <Button
            style={{ color: "white" }}
            href="/Schedule"
            className="nav-links"
          >
            Contact Us
          </Button>
        </li>
      </ul>
    </div>
  </nav>
  );
}

export default LandingScreenNavBar;
