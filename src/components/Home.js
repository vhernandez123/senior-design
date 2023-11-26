import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/Footer.js";
import DataTable from "../components/HomeTable.js";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import "../App.css";
import CatFoot from "../images/cat.jpg";

function Home() {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          // Assuming userId is available in user.userId, adjust this based on your actual data structure
          const userId = user.userId;

          const response = await Axios.get(
            `http://localhost:4000/GetUser/${userId}`
          );
          setUserData(response.data);
          console.log("User data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        console.log("Server response data:", error.response?.data);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

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
