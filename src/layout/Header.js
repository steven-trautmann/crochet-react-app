import React, { useContext, useState, useCallback } from "react";
import styled from "styled-components";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";
import "../style/hamburgerMenu.scss";
import "../style/navBar.css";

export default function Header() {
  const [width, setWidth] = useContext(InnerWidthContext);
  let fromMobile = false;
  let collapsiblesAreSet = false;

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

  window.addEventListener("load", () => {
    setDropdownPositions();
    setUpTheCollapsibleDropDownItems();
  });

  function setUpTheCollapsibleDropDownItems() {
    if (!collapsiblesAreSet) {
      let coll = document.getElementsByClassName("collapsible");

      for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
          this.classList.toggle("active");
          let content = this.nextElementSibling;
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      }
      collapsiblesAreSet = true;
    }
  }

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
    if (!fromMobile) {
      setFinishedDropDownPositions();
      setPrevDropDownPositions();
    }
  });

  React.useEffect(() => {
    if (!fromMobile) {
      setDropdownPositions();
    }
  }, [fromMobile, setDropdownPositions, width]);

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [setWidth]);

  // dropping dropDowns
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

  //Clicking out of dropdown
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

  const toggleClasses = () => {
    let elements = document.getElementsByClassName("hamburger-menu");
    if (elements[0] == null) {
      //if the hamburger menu is displayed but the window resized to desktop
      let mobileMenu = document.getElementById("mobile");
      mobileMenu.classList.remove("hamburgerDropDown");
      mobileMenu.classList.add("hamburgerDropDownDisquise");
      fromMobile = false;
    } else {
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

  const TopNav = styled.div`
    overflow: hidden;
    background-color: white;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 5rem;
    z-index: 15;
    left: 0;
    text-align: center;

    @media (min-width: 576px) {
      display: block;
    }
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
          <Link to="/kesz-termekek/figurak">
            <li>Figurák</li>
          </Link>
          <Link to="/kesz-termekek/plussok">
            <li>Plüssök</li>
          </Link>
          <Link to="/kesz-termekek/ruhak">
            <li>Ruhák</li>
          </Link>
          <Link to="/kesz-termekek/macskak">
            <li>Macskák</li>
          </Link>
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
          <Link to="/eddigi-munkak/figurak">
            <li>Figurák</li>
          </Link>
          <Link to="/eddigi-munkak/plussok">
            <li>Plüssök</li>
          </Link>
          <Link to="/eddigi-munkak/ruhak">
            <li>Ruhák</li>
          </Link>
          <Link to="/eddigi-munkak/macskak">
            <li>Macskák</li>
          </Link>
        </ul>
      </div>

      <div id="mobile" className="hamburgerDropDownDisquise">
        <button
          style={{
            fontSize: "0.5rem",
            float: "right",
            marginBottom: "0.5rem",
            background: "white",
            fontFamily: "auto",
            outline: "black",
          }}
          onClick={() => toggleClasses()}
        >
          X
        </button>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <button
              style={{ outline: "none" }}
              class="collapsible hamburgerNavItem"
            >
              Kész Termékek
            </button>
            <div style={{ borderRadius: "20%" }} class="content">
              <ul
                style={{
                  listStyleType: "none",
                  textAlign: "center",
                }}
              >
                <Link to="/kesz-termekek/figurak">
                  <li>Figurák</li>
                </Link>
                <Link to="/kesz-termekek/plussok">
                  <li>Plüssök</li>
                </Link>
                <Link to="/kesz-termekek/ruhak">
                  <li>Ruhák</li>
                </Link>
                <Link to="/kesz-termekek/macskak">
                  <li>Macskák</li>
                </Link>
              </ul>
            </div>
          </li>
          <li>
            <button
              style={{ outline: "none" }}
              class="collapsible hamburgerNavItem"
            >
              Eddigi Munkáim
            </button>
            <div style={{ borderRadius: "20%" }} class="content">
              <ul
                style={{
                  listStyleType: "none",
                  textAlign: "center",
                }}
              >
                <Link to="/eddigi-munkak/figurak">
                  <li>Figurák</li>
                </Link>
                <Link to="/eddigi-munkak/plussok">
                  <li>Plüssök</li>
                </Link>
                <Link to="/eddigi-munkak/ruhak">
                  <li>Ruhák</li>
                </Link>
                <Link to="/eddigi-munkak/macskak">
                  <li>Macskák</li>
                </Link>
              </ul>
            </div>
          </li>
          <li>
            <Link className="hamburgerNavItem" to="/rolam">
              Rólam
            </Link>
          </li>
          <li>
            <Link className="hamburgerNavItem" to="/kapcsolat">
              Kapcsolat
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
