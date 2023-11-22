import React from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/Footer.js";
import DataTable from "../components/HomeTable.js";
import "../App.css";
import CatFoot from "../images/cat.jpg";

function Home() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div class="dataTableFormatting">
          <DataTable />
        </div>
        <div class="image-container">
          <img src={CatFoot} alt="cat1" className="catimage" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
