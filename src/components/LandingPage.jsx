import React from "react";
import Spongebob from "../assets/Spongebob.mp4";
import LogoutButton from "../components/logout.js";
const LandingPage = () => {
  return (
    <div className="main">
         <LogoutButton />
      <video src={Spongebob} autoPlay loop muted />

    </div>
  );
};

export default LandingPage;
