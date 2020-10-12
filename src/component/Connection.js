import React, { useContext } from "react";
import { InnerWidthContext } from "../context/InnerWidthContext";

export default function Connection() {
  const [width] = useContext(InnerWidthContext);

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
      <div>
        <form class="gform pure-form pure-form-stacked" method="POST" data-email="example@email.net"
          action="https://script.google.com/macros/s/AKfycbxOIeZLfLu1rAjdt0RzjUzA-eTfOcROJCKrzCBQ4vW-pLcZaA/exec">

          <div class="form-elements">
            <fieldset class="pure-group">
              <label for="name">Name: </label>
              <input id="name" name="name" placeholder="What your Mom calls you" />
            </fieldset>

            <fieldset class="pure-group">
              <label for="message">Message: </label>
              <textarea id="message" name="message" rows="10"
                placeholder="Tell us what's on your mind..."></textarea>
            </fieldset>

            <fieldset class="pure-group">
              <label for="email"><em>Your</em> Email Address:</label>
              <input id="email" name="email" type="email"
                required placeholder="your.name@email.com" />
            </fieldset>

            <fieldset class="pure-group">
              <label for="color">Favourite Color: </label>
              <input id="color" name="color" placeholder="green" />
            </fieldset>

            <fieldset class="pure-group honeypot-field">
              <label for="honeypot">To help avoid spam, utilize a Honeypot technique with a hidden text field; must be empty to submit the form! Otherwise, we assume the user is a spam bot.</label>
              <input id="honeypot" type="text" name="honeypot" value="" />
            </fieldset>

            <button class="button-success pure-button button-xlarge">
              <i class="fa fa-paper-plane"></i>&nbsp;Send</button>
          </div>

          <div class="thankyou_message" style={{ display: "none" }}>
            <h2><em>Thanks</em> for contacting us! We will get back to you soon!</h2>
          </div>
        </form>

        <script data-cfasync="false" src="form-submission-handler.js"></script>
      </div>
      <div>
        <h2 style={{ margin: "2vw" }}>Közösségi Média:</h2>
      </div>
    </div>
  );
}
