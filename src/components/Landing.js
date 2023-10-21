import React from "react";
import "../css/Site.css";
import Cat1 from "../images/cat1.jpg";
import Cat2 from "../images/cat2.jpg";

const Landing = () => {
  return (
    <div className="welcome-messages">
      <div className="green-box">
        <p className="sub-message">
          Transform your pet's space into a haven of tail-wagging delight.
        </p>
        <p className="sub-message">
          Pet Logger handles
          everything, ensuring a pawsome experience for your four-legged family
          members.
        </p>
        <p className="final-message">Give your pets the love and attention they deserve!</p>
      </div>
      <div className="image-container">
        <img src={Cat1} alt="cat1" className="image" />
        <img src={Cat2} alt="cat2" className="image" />
      </div>
    </div>
  );
};

export default Landing;
