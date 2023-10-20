import React from "react";
import videoBG from "../assets/videoBG.mp4";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
import LandingScreenNavBar from "./LandingScreenNavBar";
import "../css/Site.css";
import Landing from "./Landing";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const Main = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/home`,
      },
    });
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <LandingScreenNavBar />
      <div className="main">
        <div className="overlay"></div>
        <video src={videoBG} autoPlay loop muted />
        <div className="content">
          <button className="centered-button" onClick={handleLogin}>
            Login
          </button>
          <p className="welcome-message">
        Welcome to Pet Logger, where your furry friends deserve the best!
      </p>
        </div>
        <div className="content">
</div>
      </div>
    <Landing />
    </Auth0Provider>

  );
};

export default Main;
