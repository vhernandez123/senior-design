import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0Provider
import App from "./App"; // Import your main application component
import Main from "./components/Main.jsx"; // Import your Main component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import AddPet from "./pages/AddPet";
import LogPet from "./pages/LogPet";
import PetDetails from "./pages/PetDetails";
import UpdateBehavior from "./pages/UpdateBehavior.js";
import "normalize.css";
import UpdateBathroom from "./pages/UpdateBathroom.js";
import LogMedication from "./pages/LogMedication.js";
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
          <Route path="/home/" element={<Home />} />
          <Route path="/AddPet" element={<AddPet />} />
          <Route path="/UpdateBehavior" element={<UpdateBehavior />} />
          <Route path="/LogMedication" element={<LogMedication />} />
          <Route path="/pet/:petId" element={<PetDetails />} />
          <Route path="/LogPet" element={<LogPet />} />
          <Route path="/UpdateBathroom" element={<UpdateBathroom />} />
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
