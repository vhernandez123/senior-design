import React from "react";
import "../css/LandingScreenNavBar.css";
import { Button } from "@mui/material";

function LandingScreenNavBar() {
  return (
    <nav className="navbar-gray">
      <div className="navbar-container-gray">
        <h1 className="navbar-logo-gray">
          <span className="pet-text">Pet</span>{" "}
          <span className="logger-text">Logger</span>
        </h1>
        <ul className="nav-menu-gray">
          <li className="nav-item-gray">
            <Button
              style={{ color: "white" }}
              href="/Home"
              className="nav-links-gray"
            >
              Home
            </Button>
          </li>
          <li className="nav-item-gray">
            <Button
              style={{ color: "white" }}
              href="/AboutUs"
              className="nav-links-gray"
            >
              About Us
            </Button>
          </li>
          <li className="nav-item-gray">
            <Button
              style={{ color: "white" }}
              href="/ContactUs"
              className="nav-links-gray"
            >
              Contact Us
            </Button>
          </li>
          <li className="nav-item-gray button-container">
            <Button
              style={{ color: "white" }}
              href="/Login"
              className="nav-button"
            >
              Login
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LandingScreenNavBar;
