
import React, { useState} from "react";
import emailjs from "emailjs-com";
const pdfVetSend = () => {
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
      <form ref={form} onSubmit={sendEmail}>
  <ul>
    <input
      type="text"
      name="listName"
      id="listname"
      placeholder="Enter Check List Name"
    />
    <label htmlFor="to_name">Email Receiver</label>
    <input
      type="text"
      name="to_name"
      id="to_name"
      placeholder="Who are you sending this email to?"
    />

    <textarea
      name="message"
      id="listinput"
      placeholder="Enter Pet Errands"
      cols="30"
      rows="15"
    ></textarea>

    {/* File input for attaching a PDF */}
    <label htmlFor="attachment">Attach PDF:</label>
    <input
      type="file"
      name="attachment"
      id="attachment"
      accept=".pdf"
    />

    <input
      type="button"
      name="submit"
      onClick={sendEmail}
      value="Submit"
    />

    <input type="reset" value="Reset" />
  </ul>
</form>
    </div>
  );
};

export default pdfVetSend;
