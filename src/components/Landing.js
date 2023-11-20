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
      <Footer />
    </div>
  );
};

export default Landing;
