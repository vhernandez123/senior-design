import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0Provider
import App from "./App"; // Import your main application component
import Main from "./components/Main.jsx"; // Import your Main component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/app" element={<App />} />

          {/* Add this route */}
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
