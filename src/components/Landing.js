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
          We've teamed up with top-notch pet experts and groomers to bring you a
          variety of pampering services and unique pet products. Your beloved
          pets will have all their needs met right at home. Pet Logger handles
          everything, ensuring a pawsome experience for your four-legged family
          members.
        </p>
        <p className="final-message">Give your pets the love they deserve!</p>
      </div>
      <div className="image-container">
        <img src={Cat1} alt="cat1" className="image" />
        <img src={Cat2} alt="cat2" className="image" />
      </div>
    </div>
  );
};

export default Landing;
