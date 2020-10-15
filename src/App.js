import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import { InnerWidthProvider } from "./context/InnerWidthContext";
import { ModalContextProvider } from "./context/ModalContext";
import { FinishedModalTextsContextProvider } from "./context/ModalTextsFinishedProducts";
import { PreviousModalTextsContextProvider } from "./context/ModalTextsPreviousProducts";
import { PremiumModalTextsContextProvider } from "./context/ModalTextsPremiumProducts";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Products from "./component/Products";
import PageAboutMe from "./component/PageAboutMe";
import Connection from "./component/Connection";

function App() {
  return (
    <div>
      <Router>
        <InnerWidthProvider>
          <FinishedModalTextsContextProvider>
            <PreviousModalTextsContextProvider>
              <PremiumModalTextsContextProvider>
                <ModalContextProvider>
                  <Header />
                  <Route exact path="/" component={HomePage} />
                  <Route
                    exact
                    path="/:category/:type"
                    component={Products}
                  />
                  <Route exact path="/rolam" component={PageAboutMe} />
                  <Route exact path="/kapcsolat" component={Connection} />
                  <Footer />
                </ModalContextProvider>
              </PremiumModalTextsContextProvider>
            </PreviousModalTextsContextProvider>
          </FinishedModalTextsContextProvider>
        </InnerWidthProvider>
      </Router>
    </div>
  );
}

export default App;
