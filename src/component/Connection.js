import React, { useContext, useState } from "react";
import { InnerWidthContext } from "../context/InnerWidthContext";
import Axios from "axios";
import sBubbleStyle from "../style/speechBubble.module.css";
import styled from "styled-components";
import PageTitle from "./PageTitle";

const Counter = styled.h3`
  margin: 0;
`;

export default function Connection() {
  const [width] = useContext(InnerWidthContext);
  const [formVisible, setFormVisible] = useState(true);
  const [formSentSuccess, setFormSentSuccess] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [missingInputs, setMissingInputs] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [fieldSizesAreTooLong, setFieldSizesAreTooLong] = useState(false);
  const emailAdress = "sample@sample.com";
  const fromMobile = width < 1000;

  const [maxLengthStates,] = useState({
    name: 40,
    message: 500,
    email: 60,
    additional: 50
  })

  const [emailStates, setEmailStates] = useState({
    name: "",
    message: "",
    email: "",
    additional: "",
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
      additional: emailStates.additional,
      email: emailStates.email,
      formDataNameOrder: "[\"name\",\"message\",\"email\",\"additional\"]",
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
      if (key !== "honeypot" && key !== "additional" && inputName !== key && value === "") {
        return;
      }
    }
    setMissingInputs(false);
  }

  const checkFieldsAreFilled = () => {
    for (let [key, value] of Object.entries(emailStates)) {
      if (key !== "honeypot" && key !== "additional" && value === "") {
        setMissingInputs(true);
        return false;
      }
    }
    return true;
  }

  //does not set the state
  const checkFieldSizesAreBelowMax = () => {
    for (let [key, value] of Object.entries(emailStates)) {
      if (key !== "honeypot" && value.length > maxLengthStates.key) {
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

    if (!checkFieldSizesAreBelowMax()) {
      setFieldSizesAreTooLong(true);
      somethingIsWrong = true;
    } else {
      setFieldSizesAreTooLong(false);
    }

    return !somethingIsWrong;
  }

  function handleReset(event) {
    event.preventDefault();
    if (!formSent) {
      event.preventDefault();
      setEmailStates({
        name: "",
        message: "",
        email: "",
        additional: "",
        honeypot: "",
      });
    }
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
      <PageTitle text={"Kapcsolat"} />
      <div>
        <h2 style={{ margin: "2vw" }}>Elérhetőségek:</h2>
        <ul
          style={{
            marginLeft: "6vw",
            fontSize: `${fromMobile ? "1.5rem" : "2rem"}`,
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
          style={{ display: `${formVisible ? "block" : "none"}`, fontSize: `${fromMobile ? "x-large" : "xx-large"}`, textAlign: "center" }}>
          <div>
            <fieldset style={{ visibility: "hidden" }} >
              <input type="text" name="honeypot"
                onChange={handleChange} onKeyDown={handleEnterKeydown} value={emailStates.honeypot} />
            </fieldset>

            <h1 style={{ marginBottom: "1.5rem", textDecoration: "underline" }}>Írj nekem egy üzenetet!</h1>

            <fieldset>
              <label htmlFor="name">Név: </label>
              <input name="name" placeholder={fromMobile ? "A neved" : "Milyen néven szólíthatlak?"}
                required
                maxLength={maxLengthStates.name}
                onChange={handleChange} onKeyDown={handleEnterKeydown} value={emailStates.name} />
              <Counter>{emailStates.name.length}/{maxLengthStates.name}</Counter>
            </fieldset>

            <fieldset>
              <label htmlFor="message">Üzenet: </label>
              <textarea name="message" rows="8"
                maxLength={maxLengthStates.message}
                required
                placeholder="Ide írhatod az üzenetedet..."
                onChange={handleChange} value={emailStates.message} ></textarea>
              <Counter>{emailStates.message.length}/{maxLengthStates.message}</Counter>
            </fieldset>

            {emailIsValid ? null : <h2 style={{ textDecoration: "underline", textDecorationColor: "red" }}>Helytelen e-mail cím. Ellenőrizd újra!</h2>}
            <fieldset>
              <label htmlFor="email">A <em>te</em> e-mail címed (ezen tudok neked válaszolni):</label>
              <input name="email" type="email"
                maxLength={maxLengthStates.email}
                required placeholder="a.neved@email.hu"
                onChange={handleEmailChange} onKeyDown={handleEnterKeydown} value={emailStates.email}
                style={{ border: `${emailIsValid ? "" : "solid red"}` }} />
              <Counter>{emailStates.email.length}/{maxLengthStates.email}</Counter>
            </fieldset>

            <fieldset>
              <label htmlFor="additional">Egyéb megjegyzés: </label>
              <input name="additional" placeholder={fromMobile ? "Utóirat esetleg? :)" : "Észrevételek, utóirat, bármi :)"}
                maxLength={maxLengthStates.additional}
                onChange={handleChange} onKeyDown={handleEnterKeydown} value={emailStates.additional} />
              <Counter>{emailStates.additional.length}/{maxLengthStates.additional}</Counter>
            </fieldset>

            {missingInputs ? <p className={sBubbleStyle.speechBubble}>Minden mezőt ki kell tölteni!</p> : null}
            <button onClick={handleFormSubmit} style={{ marginTop: "1.5rem" }}>Küldés</button>
            <button onClick={handleReset} style={{ marginTop: "1.5rem", marginLeft: "2rem" }}>Visszaállítás</button>
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
        {/* if upon someone overwrites the code and tries to send too large texts */}
        <div style={{ display: `${fieldSizesAreTooLong ? "block" : "none"}`, textAlign: "center" }}>
          <h3>Valamelyik mező túl hosszú!</h3>
        </div>

      </div>
      <div>
        <h2 style={{ margin: "2vw" }}>Közösségi Média:</h2>
      </div>
    </div>
  );
}
