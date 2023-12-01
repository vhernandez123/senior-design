import React from "react";
import videoBG from "../assets/videoBG.mp4";
import { useAuth0 } from "@auth0/auth0-react";
import LandingScreenNavBar from "./LandingScreenNavBar";
import "../css/Site.css";
import Landing from "./Landing";
import Auth0Bugs from "./Auth0Bugs";
const Main = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Auth0Bugs>
      <LandingScreenNavBar />
      <div className="main">
        <div className="overlay"></div>
        <video src={videoBG} autoPlay loop muted />
        <div className="content">
          <div className="CenterLog">
            <p className="welcome-message">
              Welcome to Pet Logger, where your furry friends deserve the best!
            </p>
            <button
              className="centered-button"
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    redirect_uri: `${window.location.origin}/home`,
                  },
                })
              }
            >
              Login
            </button>
            <h1 className="welcome-message">To Begin logging, please login!</h1>
          </div>
        </div>
        <div className="content"></div>
      </div>
      <Landing />
    </Auth0Bugs>
  );
};

export default Main;
