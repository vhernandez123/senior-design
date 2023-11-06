import React from "react";
import BannerImage from "../assets/orangeCat.png";
import Navbar from "./navbar";
import Footer from "../components/Footer.js";
const Contact = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-text-section">
        <div class="background-strip">
          <h1 className="primary-heading">Your Pets are our top priority</h1>
          </div>
      
          <div class="pic-and-description">
         <p className="primary-text">
            Our goal is to help pet owners and pet care professionals to better understand,
            monitor, and improve the well-being of pets by providing a
            user-friendly platform for logging, analyzing, and visualizing pet
            behaviors over time.
          </p>
        
          <img class="catGroup"src={BannerImage} alt="" />
        
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Contact;