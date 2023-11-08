import React from "react";
import BannerImage from "../assets/orangeCat.png";
import Navbar from "./navbar";
import Footer from "../components/Footer.js";
const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-text-section">
          <div class="background-strip">
            <h1 className="primary-heading">Your Pets are the priority</h1>
          </div>
          <div class="pic-and-description">
            <p className="primary-text">
              Our goal is to help pet owners and pet care professionals to
              better understand, monitor, and improve the well-being of pets by
              providing a user-friendly platform for logging, analyzing, and
              visualizing pet behaviors over time.
            </p>

            <img class="catGroup" src={BannerImage} alt="" />
          </div>
          <div class="pic-and-description">
            <div class="iframe-container gifDisplayau">
              <iframe
                src="https://giphy.com/embed/Byp2MtxE5Tyla"
                width="480"
                height="480"
                frameBorder="0"
                class="giphy-embed"
                allowFullScreen
              ></iframe>
              <p>
                <a href="https://giphy.com/gifs/cat-food-kitty-Byp2MtxE5Tyla"></a>
              </p>
            </div>
            <p className="primary-text">
              The PetLogger website allows you to track the foods your pet is
              eating at the moment. Along with knowing what foods your pets are
              eating, you can track their eating habits to ensure they arent
              skipping meals which could signal diesease.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
