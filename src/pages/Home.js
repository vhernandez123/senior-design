import React from "react";
import Navbar from "../project_components/navbar.js";
import Footer from "../project_components/Footer";
import DataTable from "../project_components/HomeTable";
import "../App.css";

function Home() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <DataTable /> {/* Render the DataTable component */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
