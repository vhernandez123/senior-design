import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Main from "./components/Main.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import AddPet from "./pages/AddPet";
import AboutUs from "./components/aboutUs.js";
import Checklist from "./components/Checklist.js";
import VetFinder from "./pages/VetFinder.js";
import LogPet from "./pages/LogPet";
import PetDetails from "./pages/PetDetails";
import UpdateBehavior from "./pages/UpdateBehavior.js";
import "normalize.css";
import Auth0Bugs from "./components/Auth0Bugs";
import UpdateBathroom from "./pages/UpdateBathroom.js";
import LogMedication from "./pages/LogMedication.js";
import LogFood from "./pages/LogFood.js";
import LoggingForms from "./pages/LoggingForms.js";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Bugs>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/app" element={<App />} />
          <Route path="/home/" element={<Home />} />
          <Route path="/AddPet" element={<AddPet />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Checklist" element={<Checklist />} />
          <Route path="/VetFinder" element={<VetFinder />} />
          <Route path="/UpdateBehavior" element={<UpdateBehavior />} />
          <Route path="/LogMedication" element={<LogMedication />} />
          <Route path="/pet/:petID" element={<PetDetails />} />
          <Route
            path="/LoggingForms/:logsID/:petID"
            element={<LoggingForms />}
          />
          <Route path="/log-pet/:petID" element={<LogPet />} />
          <Route path="/log-food/:logsID/:petID" element={<LogFood />} />
          <Route path="/UpdateBathroom" element={<UpdateBathroom />} />
        </Routes>
      </Router>
    </Auth0Bugs>
  </React.StrictMode>,
  document.getElementById("root")
);
