import React from "react";
import "../css/Site.css";
import Footer from "../components/Footer.js";
const Landing = () => {
  return (
    <div className="welcome-messages">
      <div className="green-box">
        <p className="sub-message">
          Transform your pet's space into a haven of tail-wagging delight.
        </p>
        <p className="sub-message">
          Pet Logger handles everything, ensuring a pawsome experience for your
          four-legged family members.
        </p>
        <p className="final-message">
          Give your pets the love and attention they deserve!
        </p>
      </div>
      <div class="iframe-container iframe-container-landing landingpageContain">
        <iframe
          src="https://giphy.com/embed/MWSRkVoNaC30A"
          width="384"
          height="480"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/cat-hello-oh-MWSRkVoNaC30A"></a>
        </p>

        <iframe
          src="https://giphy.com/embed/0OgdJVNjbcIifqSb7U"
          width="480"
          height="412"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/cat-hug-phone-0OgdJVNjbcIifqSb7U"></a>
        </p>
        <iframe
          src="https://giphy.com/embed/ryM5tbbRLHE3qNj8Is"
          width="480"
          height="270"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/buzzfeed-dog-puppies-funny-animals-ryM5tbbRLHE3qNj8Is"></a>
        </p>
      </div>
      <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <div class="pic-and-description">
            <p className="primary-text pt-left">
              Adding your pets to your dashboard is as easy as clicking the 'Add
              Pet' button. Fill in the requested information so you can have a
              constant frame-of-reference for this pets ongoing health. You can
              easily edit this information later as well. The information is
              information that your vets will find useful so having it in one
              area is ideal!
            </p>

            <div class="iframe-container gifDisplayrightside ">
              <iframe
                src="https://giphy.com/embed/VbnUQpnihPSIgIXuZv"
                width="384"
                height="480"
                frameBorder="0"
                class="giphy-embed"
                allowFullScreen
              ></iframe>
              <p>
                <a href="https://giphy.com/gifs/computer-cat-wearing-glasses-VbnUQpnihPSIgIXuZv"></a>
              </p>
            </div>
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
              Adding your pets to your dashboard is as easy as clicking the 'Add
              Pet' button. Fill in the requested information so you can have a
              constant frame-of-reference for this pets ongoing health. You can
              easily edit this information later as well. The information is
              information that your vets will find useful so having it in one
              area is ideal!
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
    </div>
      <Footer />
    </div>
  );
};

export default Landing;
