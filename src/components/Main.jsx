import React from "react";
import videoBG from "../assets/videoBG.mp4";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const Main = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/landing`,
      },
    });
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <div className="main">
        <div className="overlay"></div>
        <video src={videoBG} autoPlay loop muted />
        <div className="content">
          <button className="centered-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </Auth0Provider>
  );
};

// Move the export statement here, at the top level of the module
export default Main;
