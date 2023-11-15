import React from "react";
import "../css/Site.css";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import "../App.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-section-one">
          <span className="footer-icons">
            <SiLinkedin />
          </span>
          <span className="footer-icons">
            <BsYoutube />
          </span>
          <span div className="footer-icons">
            <FaFacebookF />
          </span>
        </div>
        <div className="footer">
          &copy; {new Date().getFullYear()} PetLogger
        </div>
        <div className="footer-section-two">
          <div className="footer-section-columns">
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
