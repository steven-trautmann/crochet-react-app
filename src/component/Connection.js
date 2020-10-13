import React, { useContext, useState } from "react";
import { InnerWidthContext } from "../context/InnerWidthContext";
import Axios from "axios";
import "../style/speech-bubble.css";

export default function Connection() {
  const [width] = useContext(InnerWidthContext);
  const [formVisible, setFormVisible] = useState(true);
  const [formSentSuccess, setFormSentSuccess] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [missingInputs, setMissingInputs] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
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
    if (missingInputs && value !== "") {
      checkMissingInputs(e.target.name);
    }
  }

  function handleEmailChange(e) {
    const value = e.currentTarget.value;
    setEmailStates({
      ...emailStates,
      [e.target.name]: value,
    });
    if (!emailIsValid && checkEmailValidity(value)) {
      setEmailIsValid(true);
    }
    if (missingInputs && value !== "") {
      checkMissingInputs(e.target.name);
    }
  }

  const handleEnterKeydown = (event) => {
    if (event.keyCode === 13) {
      handleFormSubmit(event);
    }
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

  // url encode form data
  const encodeData = (data) => {
    return Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
  }

  const checkEmailValidity = (newEmail) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(newEmail === "" ? emailStates.email : newEmail).toLowerCase());
  }

  function checkMissingInputs(inputName) {
    for (let [key, value] of Object.entries(emailStates)) {
      if (key !== "honeypot" && inputName !== key && value === "") {
        return;
      }
    }
    setMissingInputs(false);
  }

  const checkFieldsAreFilled = () => {
    for (let [key, value] of Object.entries(emailStates)) {
      if (key !== "honeypot" && value === "") {
        setMissingInputs(true);
        return false;
      }
    }
    return true;
  }

  const checkFieldsAreFilledCorrectly = () => {
    let somethingIsWrong = false;

    if (!checkFieldsAreFilled()) {
      setMissingInputs(true);
      somethingIsWrong = true;
    } else {
      setMissingInputs(false);
    }

    if (!checkEmailValidity("")) {
      setEmailIsValid(false);
      somethingIsWrong = true;
    } else {
      setEmailIsValid(true);
    }

    return !somethingIsWrong;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    let everyThingIsCorrect = checkFieldsAreFilledCorrectly();

    if (everyThingIsCorrect && emailStates.honeypot === "" && !formSent) {
      setFormSent(true);
      let data = getFormData();
      let encoded = encodeData(data);

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
            <fieldset style={{ visibility: "hidden" }} >
              <input type="text" name="honeypot"
                onChange={handleChange} onKeyDown={handleEnterKeydown} value={emailStates.honeypot} />
            </fieldset>
            <fieldset>
              <label htmlFor="name">Name: </label>
              <input name="name" placeholder="What your Mom calls you"
                onChange={handleChange} onKeyDown={handleEnterKeydown} value={emailStates.name} />
            </fieldset>

            <fieldset>
              <label htmlFor="message">Message: </label>
              <textarea name="message" rows="10"
                placeholder="Tell us what's on your mind..."
                onChange={handleChange} onKeyDown={handleEnterKeydown} value={emailStates.message} ></textarea>
            </fieldset>

            {emailIsValid ? null : <h3>Helytelen e-mail cím. Ellenőrizd újra!</h3>}
            <fieldset>
              <label htmlFor="email"><em>Your</em> Email Address:</label>
              <input name="email" type="email"
                required placeholder="your.name@email.com"
                onChange={handleEmailChange} onKeyDown={handleEnterKeydown} value={emailStates.email} />
            </fieldset>

            <fieldset>
              <label htmlFor="color">Favourite Color: </label>
              <input name="color" placeholder="green"
                onChange={handleChange} onKeyDown={handleEnterKeydown} value={emailStates.color} />
            </fieldset>

            {missingInputs ? <p className="speech-bubble">Minden mezőt ki kell tölteni!</p> : null}
            <button onClick={handleFormSubmit} style={{ marginTop: "1.5rem" }}>Send</button>
          </div>
        </form>
        {/* on success */}
        <div style={{ display: `${formSentSuccess ? "block" : "none"}`, textAlign: "center" }}>
          <h2><em>Köszönöm,</em> hogy írtál. Igyekszek minél hamarabb válaszolni!</h2>
        </div>
        {/* if email could not be sent */}
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
