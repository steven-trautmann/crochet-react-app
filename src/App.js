import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import { InnerWidthProvider } from "./context/InnerWidthContext";
import { ModalContextProvider } from "./context/ModalContext";
import { FinishedModalTextsContextProvider } from "./context/ModalTextsFinishedProducts";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import FinishedProducts from "./component/FinishedProducts";
import PrevProducts from "./component/PrevProducts";
import PageAboutMe from "./component/PageAboutMe";
import Connection from "./component/Connection";

function App() {
  return (
    <div>
      <Router>
        <InnerWidthProvider>
          <FinishedModalTextsContextProvider>
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
                path="/eddigi-munkak"
                component={PrevProducts}
              />
              <Route exact path="/rolam" component={PageAboutMe} />
              <Route exact path="/kapcsolat" component={Connection} />
              <Footer />
            </ModalContextProvider>
          </FinishedModalTextsContextProvider>
        </InnerWidthProvider>
      </Router>
    </div>
  );
}

export default App;
