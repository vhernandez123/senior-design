import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "normalize.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  </Router>
);
