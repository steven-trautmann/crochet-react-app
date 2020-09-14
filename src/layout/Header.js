import React, { useContext, useState, useCallback } from "react";
import styled from "styled-components";
import { NavBarThemeContext } from "../theme/NavBarThemeContext";
import { InnerWidthContext } from "../context/InnerWidthContext";
import NavBarThemes from "../theme/NavBarThemes";
import { Link } from "react-router-dom";
import "../style/hamburgerMenu.scss";
import "../style/navBar.css";

export default function Header() {
  const [themeMode, setThemeMode] = useContext(NavBarThemeContext);
  const [width, setWidth] = useContext(InnerWidthContext);
  const currentTheme = NavBarThemes[themeMode];

  let fromMobile = false;
  window.addEventListener("load", () => setDropdownPositions());

  const [
    finishedProductsLeftFromWindow,
    setFinishedProductsLeftFromWindow,
  ] = useState(0);
  const [
    finishedProductsWidthFromWindow,
    setFinishedProductsWidthFromWindow,
  ] = useState(0);
  const [prevProductsLeftFromWindow, setPrevProductsLeftFromWindow] = useState(
    0
  );
  const [
    prevProductsWidthFromWindow,
    setPrevProductsWidthFromWindow,
  ] = useState(0);

  const setFinishedDropDownPositions = () => {
    let finishedDropDownButton = document.getElementById(
      "finishedProductsButton"
    );
    setFinishedProductsLeftFromWindow(finishedDropDownButton.offsetLeft);
    setFinishedProductsWidthFromWindow(finishedDropDownButton.offsetWidth);
  };

  const setPrevDropDownPositions = () => {
    let prevDropDownButton = document.getElementById("prevProductsButton");

    setPrevProductsLeftFromWindow(prevDropDownButton.offsetLeft);
    setPrevProductsWidthFromWindow(prevDropDownButton.offsetWidth);
  };

  const setDropdownPositions = useCallback(() => {
    setFinishedDropDownPositions();
    setPrevDropDownPositions();
  });

  React.useEffect(() => {
    if (!fromMobile) {
      setDropdownPositions();
    }
  }, [fromMobile, setDropdownPositions, width]);

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [setWidth]);

  const finishedProductsDropper = () => {
    let myDropdown = document.getElementById("finishedProducts");
    dropDropDown(myDropdown);
  };

  const prevProductsDropper = () => {
    let myDropdown = document.getElementById("prevProducts");
    dropDropDown(myDropdown);
  };

  function dropDropDown(myDropdown) {
    if (myDropdown.classList.contains("dropDownDisquise")) {
      myDropdown.classList.remove("dropDownDisquise");
      myDropdown.classList.add("dropDown");
    } else {
      myDropdown.classList.remove("dropDown");
      myDropdown.classList.add("dropDownDisquise");
    }
  }

  //Clicking out
  window.onclick = function (e) {
    if (
      !e.target.matches("#finishedProductsButton") &&
      !e.target.matches("#prevProductsButton")
    ) {
      let finishedDropDown = document.getElementById("finishedProducts");
      if (finishedDropDown.classList.contains("dropDown")) {
        finishedDropDown.classList.remove("dropDown");
        finishedDropDown.classList.add("dropDownDisquise");
      }
      let prevDropDown = document.getElementById("prevProducts");
      if (prevDropDown.classList.contains("dropDown")) {
        prevDropDown.classList.remove("dropDown");
        prevDropDown.classList.add("dropDownDisquise");
      }
    }
  };

  const TopNav = styled.div`
    overflow: hidden;
    background-color: white;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 5rem;
    z-index: 2;
    left: 0;
    text-align: center;

    @media (min-width: 576px) {
      display: block;
    }
  `;

  // const Links = {
  //   border: "none",
  //   backgroundColor: "white",
  //   color: "black",
  //   float: "left",
  //   display: "block",
  //   textAlign: "center",
  //   marginLeft: "3.5rem",
  //   textDecoration: "none",
  //   fontSize: "1.9rem",
  //   padding: "1.3rem",
  //   paddingLeft: "3vw",
  //   "&:hover": {
  //     background: "gray",
  //     color: "red",
  //   },
  //   "&:active": {
  //     backgroundColor: "#2196f3",
  //     color: `${currentTheme.color}`,
  //   },
  // };

  const toggleClasses = () => {
    let elements = document.getElementsByClassName("hamburger-menu");
    elements[0].classList.toggle("animate");
    if (fromMobile === true) {
      let mobileMenu = document.getElementById("mobile");
      if (mobileMenu.classList.contains("hamburgerDropDownDisquise")) {
        mobileMenu.classList.remove("hamburgerDropDownDisquise");
        mobileMenu.classList.add("hamburgerDropDown");
      } else {
        mobileMenu.classList.remove("hamburgerDropDown");
        mobileMenu.classList.add("hamburgerDropDownDisquise");
      }
    }
  };

  const displayHamburgerMenu = () => {
    fromMobile = true;
    return (
      <div
        class="menu-wrapper"
        onClick={() => {
          toggleClasses();
        }}
      >
        <div class="hamburger-menu"></div>
      </div>
    );
  };

  const displayNavBar = () => {
    return (
      <div>
        <button
          className="navItem"
          id="finishedProductsButton"
          onClick={() => finishedProductsDropper()}
        >
          Kész Termékek
        </button>
        <button
          className="navItem"
          id="prevProductsButton"
          onClick={() => prevProductsDropper()}
        >
          Eddigi Munkák
        </button>
        <Link className="navItem" to="/history">
          Rólam
        </Link>
        <Link className="navItem" to="/">
          Kapcsolat
        </Link>
      </div>
    );
  };

  const MobileDiv = styled.div`
    position: fixed;
    top: 1rem;
    right: 0;
  `;

  return (
    <div>
      <TopNav>
        <Link
          style={{ display: "block", float: "left", marginLeft: "5vw" }}
          to="/"
        >
          <img
            src="/logo.png"
            alt="home"
            style={{ width: "5.25rem", height: "auto", textDecoration: "none" }}
          ></img>
        </Link>

        {width > 1200 ? displayNavBar() : displayHamburgerMenu()}
      </TopNav>
      <div
        id="finishedProducts"
        style={{
          left: finishedProductsLeftFromWindow,
          width: finishedProductsWidthFromWindow,
          textAlign: "center",
        }}
        className="dropDownDisquise"
      >
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link to="/kesz-termekek/figurak">Figurák</Link>
          </li>
          <li>
            <Link to="/kesz-termekek/plussok">Plüssök</Link>
          </li>
        </ul>
      </div>

      <div
        id="prevProducts"
        style={{
          left: prevProductsLeftFromWindow,
          width: prevProductsWidthFromWindow,
          textAlign: "center",
        }}
        className="dropDownDisquise"
      >
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link to="/kesz-termekek/figurak">Figurák</Link>
          </li>
          <li>
            <Link to="/kesz-termekek/plussok">Plüssök</Link>
          </li>
        </ul>
      </div>

      <div id="mobile" className="hamburgerDropDownDisquise">
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link to="/">Kész Termékek</Link>
          </li>
          <li>
            <Link to="/about">Eddigi Munkáim</Link>
          </li>
          <li>
            <Link to="/criminalDefence">Rólam</Link>
          </li>
          <li>
            <Link to="/DUIS">Kapcsolat</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
