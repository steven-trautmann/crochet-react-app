import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";
import "../style/hamburgerMenu.scss";
import "../style/navBar.css";
import "../style/links.css";

export default function Header() {
  const [width, setWidth] = useContext(InnerWidthContext);
  let fromMobile = false;
  const [collapsiblesAreSet, setCollapsiblesAreSet] = useState(false);

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
  const [premiumProductsLeftFromWindow, setPremiumProductsLeftFromWindow] = useState(
    0
  );
  const [
    premiumProductsWidthFromWindow,
    setPremiumProductsWidthFromWindow,
  ] = useState(0);

  useEffect(() => {
    window.addEventListener("load", () => {
      setDropdownPositions();
      setUpTheCollapsibleDropDownItems();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setCollapsiblesAreSet(true);
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

  const setPremiumDropDownPositions = () => {
    let premiumDropDownButton = document.getElementById("premiumProductsButton");

    setPremiumProductsLeftFromWindow(premiumDropDownButton.offsetLeft);
    setPremiumProductsWidthFromWindow(premiumDropDownButton.offsetWidth);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDropdownPositions = () => {
    if (!fromMobile) {
      setFinishedDropDownPositions();
      setPrevDropDownPositions();
      setPremiumDropDownPositions();
    }
  };

  useEffect(() => {
    setDropdownPositions();
  }, [fromMobile, setDropdownPositions, width]);

  useEffect(() => {
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

  const premiumProductsDropper = () => {
    let myDropdown = document.getElementById("premiumProducts");
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
      !e.target.matches("#prevProductsButton") &&
      !e.target.matches("#premiumProductsButton")
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
      let premiumDropDown = document.getElementById("premiumProducts");
      if (premiumDropDown.classList.contains("dropDown")) {
        premiumDropDown.classList.remove("dropDown");
        premiumDropDown.classList.add("dropDownDisquise");
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
        className="menu-wrapper"
        onClick={() => {
          toggleClasses();
        }}
      >
        <div className="hamburger-menu"></div>
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
        <button
          className="navItem"
          id="premiumProductsButton"
          onClick={() => premiumProductsDropper()}
        >
          Prémium babatermékek
        </button>
        <Link className="navItem links" to="/rolam">
          Rólam
        </Link>
        <Link className="navItem links" to="/kapcsolat">
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
    z-index: 30;
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
            src="/specialImages/logo.png"
            alt="home"
            style={{ width: "5.25rem", height: "auto", textDecoration: "none" }}
          ></img>
        </Link>

        {width > 1300 ? displayNavBar() : displayHamburgerMenu()}
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
          <Link to="/kesz-termekek/takarok">
            <li>Takarók</li>
          </Link>
          <Link to="/kesz-termekek/szundikendok">
            <li>Szundikendők</li>
          </Link>
          <Link to="/kesz-termekek/ruhak">
            <li>Ruhák</li>
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
          <Link to="/eddigi-munkak/takarok">
            <li>Takarók</li>
          </Link>
          <Link to="/eddigi-munkak/szundikendok">
            <li>Szundikendők</li>
          </Link>
          <Link to="/eddigi-munkak/ruhak">
            <li>Ruhák</li>
          </Link>
        </ul>
      </div>

      <div
        id="premiumProducts"
        style={{
          left: premiumProductsLeftFromWindow,
          width: premiumProductsWidthFromWindow,
          textAlign: "center",
        }}
        className="dropDownDisquise"
      >
        <ul style={{ listStyleType: "none" }}>
          <Link to="/premium-termekek/figurak">
            <li>Figurák</li>
          </Link>
          <Link to="/premium-termekek/takarok">
            <li>Takarók</li>
          </Link>
          <Link to="/premium-termekek/szundikendok">
            <li>Szundikendők</li>
          </Link>
          <Link to="/premium-termekek/ruhak">
            <li>Ruhák</li>
          </Link>
        </ul>
      </div>

      <div id="mobile" className="hamburgerDropDownDisquise">
        <button
          style={{
            fontSize: "0.5rem",
            float: "right",
            marginBottom: "0rem",
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
              className="collapsible hamburgerNavItem"
            >
              Kész Termékek
            </button>
            <div style={{ borderRadius: "20%" }} className="content">
              <ul
                style={{
                  listStyleType: "none",
                  textAlign: "center",
                }}
              >
                <Link to="/kesz-termekek/figurak">
                  <li>Figurák</li>
                </Link>
                <Link to="/kesz-termekek/takarok">
                  <li>Takarók</li>
                </Link>
                <Link to="/kesz-termekek/szundikendok">
                  <li>Szundikendők</li>
                </Link>
                <Link to="/kesz-termekek/ruhak">
                  <li>Ruhák</li>
                </Link>
              </ul>
            </div>
          </li>
          <li>
            <button
              style={{ outline: "none" }}
              className="collapsible hamburgerNavItem"
            >
              Eddigi Munkáim
            </button>
            <div style={{ borderRadius: "20%" }} className="content">
              <ul
                style={{
                  listStyleType: "none",
                  textAlign: "center",
                }}
              >
                <Link to="/eddigi-munkak/figurak">
                  <li>Figurák</li>
                </Link>
                <Link to="/eddigi-munkak/takarok">
                  <li>Takarók</li>
                </Link>
                <Link to="/eddigi-munkak/szundikendok">
                  <li>Szundikendők</li>
                </Link>
                <Link to="/eddigi-munkak/ruhak">
                  <li>Ruhák</li>
                </Link>
              </ul>
            </div>
          </li>
          <li>
            <button
              style={{ outline: "none" }}
              className="collapsible hamburgerNavItem"
            >
              Prémium Babatermékek
            </button>
            <div style={{ borderRadius: "20%" }} className="content">
              <ul
                style={{
                  listStyleType: "none",
                  textAlign: "center",
                }}
              >
                <Link to="/premium-termekek/figurak">
                  <li>Figurák</li>
                </Link>
                <Link to="/premium-termekek/takarok">
                  <li>Takarók</li>
                </Link>
                <Link to="/premium-termekek/szundikendok">
                  <li>Szundikendők</li>
                </Link>
                <Link to="/premium-termekek/ruhak">
                  <li>Ruhák</li>
                </Link>
              </ul>
            </div>
          </li>
          <Link className="hamburgerNavItem links" to="/rolam">
            <li>Rólam</li>
          </Link>
          <Link className="hamburgerNavItem links" to="/kapcsolat">
            <li>Kapcsolat</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
