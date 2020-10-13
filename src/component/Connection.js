import React, { useContext, useState } from "react";
import { InnerWidthContext } from "../context/InnerWidthContext";
import Axios from "axios";

export default function Connection() {
  const [width] = useContext(InnerWidthContext);
  const [formVisible, setFormVisible] = useState(true);
  const [formSentSuccess, setFormSentSuccess] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  let emailAdress = "sample@sample.com";

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
      color: emailStates.color,
      email: emailStates.email,
      formDataNameOrder: "[\"name\",\"message\",\"email\",\"color\"]",
      formGoogleSendEmail: "example@email.net",
      formGoogleSheetName: "responses",
      message: emailStates.message,
      name: emailStates.name
    }
  }

  const checkFieldsAreFilled = () => {
    for (let [key, value] of Object.entries(emailStates)) {
      if (key !== "honeypot" && value === "") {
        return false;
      }
    }
    return true;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (checkFieldsAreFilled() && emailStates.honeypot === "" && !formSent) {
      setFormSent(true);
      let data = getFormData();

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
            setFormSentSuccess(true);
          } else {
            setFormVisible(false);
            setErrorHappened(true);
          }
        })
        .catch((error) => {
          setFormVisible(false);
          setErrorHappened(true);
        });
    }
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
          <li>E-mail: {emailAdress}</li>
          <li>Telefon: 06 20 587 4099</li>
        </ul>
      </div>
      {/* email */}
      <div>
        <form method="POST" data-email="example@email.net"
          action="https://script.google.com/macros/s/AKfycbxOIeZLfLu1rAjdt0RzjUzA-eTfOcROJCKrzCBQ4vW-pLcZaA/exec"
          style={{ display: `${formVisible ? "block" : "none"}` }}>

          <div>
            <fieldset>
              <label htmlFor="name">Name: </label>
              <input name="name" placeholder="What your Mom calls you"
                onChange={handleChange} value={emailStates.name} />
            </fieldset>

            <fieldset>
              <label htmlFor="message">Message: </label>
              <textarea name="message" rows="10"
                placeholder="Tell us what's on your mind..."
                onChange={handleChange} value={emailStates.message} ></textarea>
            </fieldset>

            <fieldset>
              <label htmlFor="email"><em>Your</em> Email Address:</label>
              <input name="email" type="email"
                required placeholder="your.name@email.com"
                onChange={handleChange} value={emailStates.email} />
            </fieldset>

            <fieldset>
              <label htmlFor="color">Favourite Color: </label>
              <input name="color" placeholder="green"
                onChange={handleChange} value={emailStates.color} />
            </fieldset>

            <fieldset style={{ visibility: "hidden" }} >
              <input type="text" name="honeypot"
                onChange={handleChange} value={emailStates.honeypot} />
            </fieldset>

            <button onClick={handleFormSubmit}>Send</button>
          </div>
        </form>
        <div style={{ display: `${formSentSuccess ? "block" : "none"}`, textAlign: "center" }}>
          <h2><em>Köszönöm,</em> hogy írtál. Igyekszek minél hamarabb válaszolni!</h2>
        </div>
        <div style={{ display: `${errorHappened ? "block" : "none"}`, textAlign: "center" }}>
          <h3>Hiba történt, az üzenetet nem sikerült elküldeni.</h3>
          <h3>Próbálkozzon kézzel küldeni üzenetet a {emailAdress} e-mail címre!</h3>
        </div>

      </div>
      <div>
        <h2 style={{ margin: "2vw" }}>Közösségi Média:</h2>
      </div>
    </div>
  );
}
