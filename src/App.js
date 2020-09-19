import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import { SearchProvider } from "./context/SearchContext";
import { InnerWidthProvider } from "./context/InnerWidthContext";
import { ModalContextProvider } from "./context/ModalContext";
import { FinishedModalTextsContextProvider } from "./context/ModalTextsFinishedProducts";
import { PreviousModalTextsContextProvider } from "./context/ModalTextsPreviousProducts";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import FinishedProducts from "./component/FinishedProducts";
import PreviousProducts from "./component/PreviousProducts";

function App() {
  return (
    <div>
      <Router>
        <SearchProvider>
          <InnerWidthProvider>
            <FinishedModalTextsContextProvider>
              <PreviousModalTextsContextProvider>
                <ModalContextProvider>
                  <Header />
                  <Route exact path="/" component={HomePage} />
                  <Route
                    exact
                    path="/kesz-termekek/:type"
                    component={FinishedProducts}
                  />
                  <Route
                    exact
                    path="/eddigi-munkak/:type"
                    component={PreviousProducts}
                  />
                  <Footer />
                </ModalContextProvider>
              </PreviousModalTextsContextProvider>
            </FinishedModalTextsContextProvider>
          </InnerWidthProvider>
        </SearchProvider>
      </Router>
    </div>
  );
}

export default App;
