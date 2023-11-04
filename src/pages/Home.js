import React from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/Footer";
import DataTable from "../components/HomeTable";
import "../App.css";

function Home() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <DataTable />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
