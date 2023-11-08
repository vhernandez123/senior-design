import React from "react";
import BannerImage from "../assets/orangeCat.png";
import Navbar from "./navbar";
import Footer from "../components/Footer.js";

const Home = () => {
  const showInput = () => {
    // Implement the logic to handle the form submission here
  };

  return (
   
    <div className="checkList-container">
      <Navbar />
      <div className="home-banner-container">
      <div class="background-strip">
      <div class="iframe-container">
      <iframe src="https://giphy.com/embed/eeUJaTwsHh3tswkaYm" width="384" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/eeUJaTwsHh3tswkaYm"></a></p>
      </div>
        <div className="formcontainer">
          <h2>Create list here</h2>
          <form>
            <ul>
                <input
                  type="text"
                  name="listName"
                  id="listname"
                  placeholder="Enter Check List Name"
                />
                <textarea
                  name="list"
                  id="listinput"
                  placeholder="Enter Pet Checklist"
                  cols="30"
                  rows="15"
                ></textarea>

                <input
                  type="button"
                  name="submit"
                  onClick={showInput}
                  value="submit"
                />

                <input type="reset" value="reset" />
            </ul>
          </form>
        </div>
        <div class="iframe-container catsFrame">
        <iframe src="https://giphy.com/embed/G6fmc0H5xpZDO" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/cat-fight-attack-G6fmc0H5xpZDO"></a></p>
      </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
