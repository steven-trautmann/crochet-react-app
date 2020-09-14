import React, { useContext, useState } from "react";
import styled from "styled-components";
import { NavBarThemeContext } from "../theme/NavBarThemeContext";
import { InnerWidthContext } from "../context/InnerWidthContext";
import NavBarThemes from "../theme/NavBarThemes";
import { Link } from "react-router-dom";
import "../style/hamburgerMenu.scss";
import "../style/navBar.css";
import $ from "jquery";

export default function Header() {
  const [themeMode, setThemeMode] = useContext(NavBarThemeContext);
  const [width, setWidth] = useContext(InnerWidthContext);
  const currentTheme = NavBarThemes[themeMode];
  // const { JSDOM } = require( "jsdom" );
  // const { window } = new JSDOM( "" );
  // const $ = require( "jquery" )( window );

  let fromMobile = false;

  const [productsLeftFromWindow, setProductsLeftFromWindow] = useState(0);
  const [productsWidthFromWindow, setProductsWidthFromWindow] = useState(0);

  React.useEffect(() => {
    if (!fromMobile) {
      setProductsLeftFromWindow(
        document.getElementById("finishedProductsButton").offsetLeft
      );
      setProductsWidthFromWindow(
        document.getElementById("finishedProductsButton").offsetWidth
      );
    }
  }, [fromMobile, width]);

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [setWidth]);

  const finishedProductsDropper = () => {
    let myDropdown = document.getElementById("finishedProducts");
    if (myDropdown.classList.contains("finishedProductsDropDownDisquise")) {
      myDropdown.classList.remove("finishedProductsDropDownDisquise");
      myDropdown.classList.add("finishedProductsDropDown");
    } else {
      myDropdown.classList.remove("finishedProductsDropDown");
      myDropdown.classList.add("finishedProductsDropDownDisquise");
    }
  };

  //Clicking out
  window.onclick = function (e) {
    if (!e.target.matches("#finishedProductsButton")) {
      let myDropdown = document.getElementById("finishedProducts");
      if (myDropdown.classList.contains("finishedProductsDropDown")) {
        myDropdown.classList.remove("finishedProductsDropDown");
        myDropdown.classList.add("finishedProductsDropDownDisquise");
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

  const Links = {
    color: "black",
    float: "left",
    display: "block",
    textAlign: "center",
    marginLeft: "3.5rem",
    textDecoration: "none",
    fontSize: "1.9rem",
    padding: "1.3rem",
    paddingLeft: "3vw",
    ":hover": {
      backgroundColor: "#ddd",
      color: "gray",
    },
    ":active": {
      backgroundColor: "#2196f3",
      color: `${currentTheme.color}`,
    },
  };

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
        <Link style={Links} to="/kesz-termekek/figurak">
          Kész Termékek
        </Link>
        <button
          style={Links}
          id="finishedProductsButton"
          onClick={() => finishedProductsDropper()}
        >
          Eddigi Munkáim
        </button>

        <Link style={Links} to="/history">
          Rólam
        </Link>
        <Link style={Links} to="/">
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
        style={{ left: productsLeftFromWindow, width: productsWidthFromWindow }}
        className="finishedProductsDropDownDisquise"
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
