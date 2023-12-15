import React, { lazy, Suspense }  from "react";
import ReactDOM from "react-dom";

//react-snap
import { hydrate, render } from "react-dom";

import "./index.css";
const App = lazy(() => import('./App'));
//import App from "./App";
const Main = lazy(() => import('./components/Main.jsx'));
//import Main from "./components/Main.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Home = lazy(() => import('./components/Home.js'));
//import Home from "./components/Home.js";
const AddPet = lazy(() => import('./pages/AddPet'));
//import AddPet from "./pages/AddPet";
const AboutUs = lazy(() => import('./components/aboutUs.js'));
//import AboutUs from "./components/aboutUs.js";
const Checklist = lazy(() => import('./components/Checklist.js'));
//import Checklist from "./components/Checklist.js";
const VetFinder = lazy(() => import('./pages/VetFinder.js'));
//import VetFinder from "./pages/VetFinder.js";
const LogPet = lazy(() => import('./pages/LogPet.js'));
//import LogPet from "./pages/LogPet";
const PetDetails = lazy(() => import('./pages/PetDetails.js'));
//import PetDetails from "./pages/PetDetails";
const UpdateBehavior = lazy(() => import('./pages/UpdateBehavior.js'));
//import UpdateBehavior from "./pages/UpdateBehavior.js";
import "normalize.css";
import Auth0Bugs from "./components/Auth0Bugs";
const UpdateBathroom = lazy(() => import('./pages/UpdateBathroom.js'));
//import UpdateBathroom from "./pages/UpdateBathroom.js";
const LogMedication = lazy(() => import('./pages/LogMedication.js'));
//import LogMedication from "./pages/LogMedication.js";
const LogFood = lazy(() => import('./pages/LogFood.js'));
//import LogFood from "./pages/LogFood.js";
const LoggingForms = lazy(() => import('./pages/LoggingForms.js'));
//import LoggingForms from "./pages/LoggingForms.js";
const EditPet = lazy(() => import('./pages/EditPet.js'));
//import EditPet from "./pages/EditPet.js";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

/*
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()){
  console.log("Using hydrate");  
  hydrate(
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
              <Route
                path="/UpdateBehavior/:logsID/:petID"
                element={<UpdateBehavior />}
              />
              <Route
                path="/LogMedication/:logsID/:petID"
                element={<LogMedication />}
              />
              <Route path="/pet/:petID" element={<PetDetails />} />
              <Route
                path="/LoggingForms/:logsID/:petID"
                element={<LoggingForms />}
              />
              <Route path="/log-pet/:petID" element={<LogPet />} />
              <Route path="/log-food/:logsID/:petID" element={<LogFood />} />
              <Route
                path="/UpdateBathroom/:logsID/:petID"
                element={<UpdateBathroom />}
              />
              <Route path="/EditPet/:petID" element={<EditPet />} />
            </Routes>
          </Router>
        </Auth0Bugs>
      </React.StrictMode>,
      rootElement);
} else {
  console.log("Using render");
  render(
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
          <Route
            path="/UpdateBehavior/:logsID/:petID"
            element={<UpdateBehavior />}
          />
          <Route
            path="/LogMedication/:logsID/:petID"
            element={<LogMedication />}
          />
          <Route path="/pet/:petID" element={<PetDetails />} />
          <Route
            path="/LoggingForms/:logsID/:petID"
            element={<LoggingForms />}
          />
          <Route path="/log-pet/:petID" element={<LogPet />} />
          <Route path="/log-food/:logsID/:petID" element={<LogFood />} />
          <Route
            path="/UpdateBathroom/:logsID/:petID"
            element={<UpdateBathroom />}
          />
          <Route path="/EditPet/:petID" element={<EditPet />} />
        </Routes>
      </Router>
    </Auth0Bugs>
  </React.StrictMode>, rootElement);
}
*/



ReactDOM.render(
  <React.StrictMode>
    <Auth0Bugs>
      <Router>
      <Suspense fallback={<span>Loading...</span>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/app" element={<App />} />
          <Route path="/home/" element={<Home />} />
          <Route path="/AddPet" element={<AddPet />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Checklist" element={<Checklist />} />
          <Route path="/VetFinder" element={<VetFinder />} />
          <Route
            path="/UpdateBehavior/:logsID/:petID"
            element={<UpdateBehavior />}
          />
          <Route
            path="/LogMedication/:logsID/:petID"
            element={<LogMedication />}
          />
          <Route path="/pet/:petID" element={<PetDetails />} />
          <Route
            path="/LoggingForms/:logsID/:petID"
            element={<LoggingForms />}
          />
          <Route path="/log-pet/:petID" element={<LogPet />} />
          <Route path="/log-food/:logsID/:petID" element={<LogFood />} />
          <Route
            path="/UpdateBathroom/:logsID/:petID"
            element={<UpdateBathroom />}
          />
          <Route path="/EditPet/:petID" element={<EditPet />} />
        </Routes>
        </Suspense>
      </Router>
    </Auth0Bugs>
  </React.StrictMode>,
  document.getElementById("root")
);