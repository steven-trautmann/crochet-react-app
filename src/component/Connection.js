import React, { useContext, useState } from "react";
import { InnerWidthContext } from "../context/InnerWidthContext";
import Axios from "axios";

export default function Connection() {
  const [width] = useContext(InnerWidthContext);
  const [formVisible, setFormVisible] = useState(true);

  const [emailStates, setEmailStates] = useState({
    name: "",
    message: "",
    email: "",
    color: "",
    honeypot: "",
  });

  function handleChange(e) {
    const value = e.currentTarget.value;
    setEmailStates({
      ...emailStates,
      [e.target.name]: value,
    });
  }

  const getFormData = () => {
    return {
      data: {
        color: emailStates.color,
        email: emailStates.email,
        formDataNameOrder: "[\"name\",\"message\",\"email\",\"color\"]",
        formGoogleSendEmail: "example@email.net",
        formGoogleSheetName: "responses",
        message: emailStates.message,
        name: emailStates.name
      }, honeypot: emailStates.honeypot
    };
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    let formData = getFormData();
    console.log(formData);

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot !== "") {
      return;
    }

    let data = formData.data;

    // url encode form data
    let encoded = Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');

    Axios.post("https://script.google.com/macros/s/AKfycbxOIeZLfLu1rAjdt0RzjUzA-eTfOcROJCKrzCBQ4vW-pLcZaA/exec", encoded, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then((response) => {
        if (response.status === 200) {
          setFormVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={{ marginTop: "6rem" }}>
      <h1 style={{ borderBottom: "solid", margin: "2vw", marginBottom: "5vw", textAlign: "center" }}>
        Kapcsolat
      </h1>
      <div>
        <h2 style={{ margin: "2vw" }}>Elérhetőségek:</h2>
        <ul
          style={{
            marginLeft: "6vw",
            fontSize: `${width > 1000 ? "2rem" : "1.75rem"}`,
          }}
        >
          <li>E-mail: sample@sample.com</li>
          <li>Telefon: 06 20 587 4099</li>
        </ul>
      </div>
      {/* email */}
      <div>
        <form class="gform pure-form pure-form-stacked" method="POST" data-email="example@email.net"
          action="https://script.google.com/macros/s/AKfycbxOIeZLfLu1rAjdt0RzjUzA-eTfOcROJCKrzCBQ4vW-pLcZaA/exec"
          style={{ display: `${formVisible ? "block" : "none"}` }}>

          <div class="form-elements">
            <fieldset class="pure-group">
              <label for="name">Name: </label>
              <input id="name" name="name" placeholder="What your Mom calls you"
                onChange={handleChange} value={emailStates.name} />
            </fieldset>

            <fieldset class="pure-group">
              <label for="message">Message: </label>
              <textarea id="message" name="message" rows="10"
                placeholder="Tell us what's on your mind..."
                onChange={handleChange} value={emailStates.message} ></textarea>
            </fieldset>

            <fieldset class="pure-group">
              <label for="email"><em>Your</em> Email Address:</label>
              <input id="email" name="email" type="email"
                required placeholder="your.name@email.com"
                onChange={handleChange} value={emailStates.email} />
            </fieldset>

            <fieldset class="pure-group">
              <label for="color">Favourite Color: </label>
              <input id="color" name="color" placeholder="green"
                onChange={handleChange} value={emailStates.color} />
            </fieldset>

            <fieldset style={{ visibility: "hidden" }} class="pure-group">
              <input id="honeypot" type="text" name="honeypot"
                onChange={handleChange} value={emailStates.honeypot} />
            </fieldset>

            <button onClick={handleFormSubmit}>Send</button>
          </div>
        </form>
        <div style={{ display: `${formVisible ? "none" : "block"}`, textAlign: "center" }}>
          <h2><em>Köszönöm,</em> hogy írtál. Igyekszek minél hamarabb válaszolni!</h2>
        </div>

      </div>
      <div>
        <h2 style={{ margin: "2vw" }}>Közösségi Média:</h2>
      </div>
    </div>
  );
}
