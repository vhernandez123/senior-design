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
          <div class="pic-and-description cats12">
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
              skipping meals which could signal disease.
            </p>
          </div>
          <div class="pic-and-description">
            <p className="primary-text pt-left">
              Adding your delets to your dashboard is as easy as clicking the
              'Add Pet' button. Fill in the requested information so you can
              have a constant frame-of-reference for this pets ongoing health.
              You can easily edit this information later as well. The
              information is information that your vets will find useful so
              having it in one area is ideal!
            </p>

            <div class="iframe-container gifDisplayrightside ">
              <iframe
                src="https://giphy.com/embed/eYilisUwipOEM"
                width="480"
                height="348"
                margin-left="80vh"
                frameBorder="0"
                class="giphy-embed"
                allowFullScreen
              ></iframe>
              <p>
                <a href="https://giphy.com/gifs/barkpost-barkpost-happy-wednesday-working-like-a-dog-eYilisUwipOEM"></a>
              </p>
            </div>
          </div>
          <div class="pic-and-description">
            <div class="iframe-container gifDisplayau">
              <iframe
                src="https://giphy.com/embed/YRtLgsajXrz1FNJ6oy"
                width="480"
                height="480"
                frameBorder="0"
                class="giphy-embed"
                allowFullScreen
              ></iframe>
              <p>
                <a href="https://giphy.com/gifs/moodman-YRtLgsajXrz1FNJ6oy"></a>
              </p>
            </div>
            <p className="primary-text">
              Besides viewing basic information about your pet, you can also log
              your pet behaviors. The way our pets act can be telling factors on
              how theyre feeling. Logging features of their feces of even vomit
              can also show patterns and abnormalites that can be relayed to
              your vet.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
