import React, { useState, useEffect} from "react";
import Navbar from "../components/navbar.js";
import Footer from "../components/Footer.js";
const DataTable = lazy(() => import('./components/HomeTable'));
//import DataTable from "../components/HomeTable.js";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import "../App.css";
import CatFoot from "../images/cat.jpg";
// import useUserFinder  from "../components/userFinder.js";
import { blobToURL, fromBlob } from 'image-resize-compress';
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

function Home() {
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  // const { user, getIdTokenClaims } = useAuth0();

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

    //const onlyWidth = useWindowWidth()
    // quality value for webp and jpeg formats.
    const quality = 80;
    // output width. 0 will keep its original width and 'auto' will calculate its scale from height.
    const width = import("@react-hook/window-size").then(useWindowWidth() * 0.8); //make it 80% of the current window width 
    // output height. 0 will keep its original height and 'auto' will calculate its scale from width.
    const height = 'auto';
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = 'webp';

      // note only the blobFile argument is required
    fromBlob(CatFoot, quality, width, height, format).then((blob) => {
      // will output the converted blob file
      console.log(blob);
      // will generate a url to the converted file
      blobToURL(blob).then((url) => console.log(url));
    });
  

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
          <img class="bottom-image"src={url} alt="cat1" className="catimage" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
