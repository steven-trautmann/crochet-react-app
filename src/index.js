import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NavBarThemeContextProvider } from "./theme/NavBarThemeContext";
import { DefaultCitiesProvider } from "./context/DefaultCitiesContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <NavBarThemeContextProvider>
    <DefaultCitiesProvider>
      <App />
    </DefaultCitiesProvider>
  </NavBarThemeContextProvider>,
  document.getElementById("root")
);
