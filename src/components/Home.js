import React, { lazy, Suspense, useState, useEffect} from "react";
import Navbar from "./navbar.js";
import Footer from "./Footer.js";
//import DataTable from "../components/HomeTable.js";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import "../App.css";
import CatFoot from "../images/cat.jpg";
// import useUserFinder  from "../components/userFinder.js";
import { useWindowWidth } from '@react-hook/window-size';
import imageCompression from 'browser-image-compression';

const DataTable = lazy(() => import('./HomeTable.js'));


function Home() {
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  // const { user, getIdTokenClaims } = useAuth0();

  const [imgFile, setImgFile] = useState(CatFoot);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
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

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Check if user is defined before accessing its properties
        if (user) {
          const idToken = await getIdTokenClaims();
          setUserId(idToken['https://example.com/userId']);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [getIdTokenClaims, user]); 


  useEffect(() => {
    const optImage = async () => {
    
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: useWindowWidth
      }
      try {
        const compressedFile = await imageCompression(imgFile, options);
        console.log(compressedFile.size/1024/1024);
        setImgFile(compressedFile);
      } catch (error) {
        console.log("Error compressing image: ", error);
      }
    
    }
  }
  );
  


  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div class="dataTableFormatting">
          <Suspense fallback={<span>Loading...</span>}>
            <DataTable/>
          </Suspense> 
        </div>
        <div class="image-container">
          <img class="bottom-image"src={imgFile} alt="cat1" className="catimage" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
