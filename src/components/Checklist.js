
import React, { useState} from "react";
import BannerImage from "../assets/orangeCat.png";
import Navbar from "./navbar";
import Footer from "../components/Footer.js";
import emailjs from "emailjs-com";
const Home = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ftnjz4b",
        "template_vk7nuxq",
        form.current,
        "fwBA3nPaGdt1hV2NP"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    
      resetForm();
  };
  const form = React.createRef();
  const resetForm = () => {
    form.current.reset();
  };
  return (
    <div className="checkList-container">
      <Navbar />
      <div className="home-banner-container checkListContain">
        <div class="background-strip">
          <div class="iframe-container">
            <iframe
              src="https://giphy.com/embed/eeUJaTwsHh3tswkaYm"
              width="384"
              height="480"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/eeUJaTwsHh3tswkaYm"></a>
            </p>
          </div>
          <div className="formcontainer">
            <h2>Pet Errands</h2>
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <input
                  type="text"
                  name="listName"
                  id="listname"
                  placeholder="Enter Check List Name"
                />
    <label for="to_name">Email Reciever </label>
    <input type="text" name="to_name" id="to_name" placeholder="Who are you sending this email to?"/>

                <textarea
                  name="message"
                  id="listinput"
                  placeholder="Enter Pet Errands"
                  cols="30"
                  rows="15"
                ></textarea>

                <input
                  type="button"
                  name="submit"
                  onClick={sendEmail}
                  value="submit"
                />

                <input type="reset" value="reset" />
              </ul>
            </form>
          </div>
          <div class="iframe-container catsFrame">
            <iframe
              src="https://giphy.com/embed/G6fmc0H5xpZDO"
              width="480"
              height="480"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/cat-fight-attack-G6fmc0H5xpZDO"></a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
