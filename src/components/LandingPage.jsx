import React from "react";
import Spongebob from "../assets/Spongebob.mp4";

const LandingPage = () => {
  return (
    <div className="main">
      <div className="overlay"></div>
      <video src={Spongebob} autoPlay loop muted />
    </div>
  );
};

export default LandingPage;
