import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import { SearchProvider } from "./context/SearchContext";
import { InnerWidthProvider } from "./context/InnerWidthContext";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { NavBarThemeContext } from "./theme/NavBarThemeContext";
import NavBarThemes from "./theme/NavBarThemes";
import FinishedProducts from "./component/FinishedProducts";

function App() {
  const [themeMode, setThemeMode] = useContext(NavBarThemeContext);
  const currentTheme = NavBarThemes[themeMode];

  return (
    <div>
      <Router>
        <SearchProvider>
          <InnerWidthProvider>
            <Header />
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/kesz-termekek/:type"
              component={FinishedProducts}
            />
            <Footer />
          </InnerWidthProvider>
        </SearchProvider>
      </Router>
    </div>
  );
}

export default App;
