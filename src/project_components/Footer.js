import React from "react";
import "../css/Site.css";

function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} PetLogger
    </footer>
  );
}

export default Footer;
