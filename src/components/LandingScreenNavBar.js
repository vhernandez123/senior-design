import React from "react";
import "../css/LandingScreenNavBar.css";
import AboutUs from "../components/aboutUs.js";
import { Avatar, Button } from "@mui/material";
import LogoutButton from "../components/logout.js";
function LandingScreenNavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Pet Logger</h1>
        <ul className="nav-menu">
          
        </ul>
      </div>
    </nav>
  );
}

export default LandingScreenNavBar;
