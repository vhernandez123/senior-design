import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0Provider
import App from "./App"; // Import your main application component
import Main from "./components/Main.jsx"; // Import your Main component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import AddPet from "./pages/AddPet";
import UpdateFood from "./pages/UpdateFood.js";
import UpdateBathroom from "./pages/UpdateBathroom.js";
import UpdateBehavior from "./pages/UpdateBehavior.js";
import UpdateOther from "./pages/UpdateOther.js";
import VetFinder from "./pages/VetFinder.js";
//import { APIProvider } from "@vis.gl/react-google-maps"; //import google maps api

//import "normalize.css";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;


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
          <Route path="/home" element={<Home />} /> {/* Add this route */}
          <Route path="/AddPet" element={<AddPet />} />
          <Route path="/UpdateForm" element={<UpdateFood/>}/>
           <Route path="/UpdateBathroom" element={<UpdateBathroom />} />
           <Route path="/UpdateBehavior" element={<UpdateBehavior />} />
           <Route path="/UpdateOther" element={<UpdateOther />} />
           <Route path="/VetFinder" element={<VetFinder/>}/>

           
           


        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
