import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";
import "../style/hamburgerMenu.scss";
import "../style/navBar.css";
import "../style/links.css";

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

export default function Header() {
  const [width, setWidth] = useContext(InnerWidthContext);
  let fromMobile = false;
  const [collapsiblesAreSet, setCollapsiblesAreSet] = useState(false);

  const [menuPositions, setMenuPositions] = useState({
    finishedProductsLeftFromWindow: 0,
    finishedProductsWidth: 0,
    prevProductsLeftFromWindow: 0,
    prevProductsWidth: 0,
    premiumProductsLeftFromWindow: 0,
    premiumProductsWidth: 0
  })


  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDropdownPositions = () => {
    if (!fromMobile) {
      let finishedDropDownButton = document.getElementById("finishedProductsButton");
      let prevDropDownButton = document.getElementById("prevProductsButton");
      let premiumDropDownButton = document.getElementById("premiumProductsButton");
      setMenuPositions({
        prevProductsLeftFromWindow: prevDropDownButton.offsetLeft,
        prevProductsWidth: prevDropDownButton.offsetWidth,
        finishedProductsLeftFromWindow: finishedDropDownButton.offsetLeft,
        finishedProductsWidth: finishedDropDownButton.offsetWidth,
        premiumProductsLeftFromWindow: premiumDropDownButton.offsetLeft,
        premiumProductsWidth: premiumDropDownButton.offsetWidth
      })
    }
  };

  useEffect(() => {
    window.addEventListener("load", () => {
      setDropdownPositions();
      setUpTheCollapsibleDropDownItems();
    });
  }, [setDropdownPositions, setUpTheCollapsibleDropDownItems]);

  useEffect(() => {
    setDropdownPositions();
  }, [fromMobile, setDropdownPositions, width]);

  useEffect(() => {
    if (fromMobile) {
      console.log("triggered")
      closeAllNavBarSubmenus();
    }
  }, [fromMobile]);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [setWidth]);

  function triggerToggleDropDown(e) {
    let buttonName = e.target.name;
    let myDropdown;

    if (buttonName === "finishedProductsDropper") {
      myDropdown = document.getElementById("finishedProducts");
    } else if (buttonName === "prevProductsDropper") {
      myDropdown = document.getElementById("prevProducts");
    } else if (buttonName === "premiumProductsDropper") {
      myDropdown = document.getElementById("premiumProducts");
    }

    if (myDropdown.classList.contains("dropDownDisquise")) {
      myDropdown.classList.remove("dropDownDisquise");
      myDropdown.classList.add("dropDown");
    } else {
      myDropdown.classList.remove("dropDown");
      myDropdown.classList.add("dropDownDisquise");
    }
  }

  function closeAllNavBarSubmenus() {
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

  //Clicking out of dropdown
  window.onclick = function (e) {
    if (!e.target.matches("#finishedProductsButton") &&
      !e.target.matches("#prevProductsButton") &&
      !e.target.matches("#premiumProductsButton")) {
      closeAllNavBarSubmenus();
    }
  };

  const toggleClassesHamMenu = () => {
    let hamMenu = document.getElementsByClassName("hamburger-menu");
    if (hamMenu[0] == null) {
      //if the hamburger menu is displayed but the window resized to desktop
      let mobileMenu = document.getElementById("mobile");
      mobileMenu.classList.remove("hamburgerDropDown");
      mobileMenu.classList.add("hamburgerDropDownDisquise");
      fromMobile = false;
    } else {
      hamMenu[0].classList.toggle("animate");
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
          toggleClassesHamMenu();
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
          name="finishedProductsDropper"
          onClick={triggerToggleDropDown}
        >
          Kész Termékek
        </button>
        <button
          className="navItem"
          id="prevProductsButton"
          name="prevProductsDropper"
          onClick={triggerToggleDropDown}
        >
          Eddigi Munkák
        </button>
        <button
          className="navItem"
          id="premiumProductsButton"
          name="premiumProductsDropper"
          onClick={triggerToggleDropDown}
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

        {width > 1380 ? displayNavBar() : displayHamburgerMenu()}
      </TopNav>
      <div
        id="finishedProducts"
        style={{
          left: menuPositions.finishedProductsLeftFromWindow,
          width: menuPositions.finishedProductsWidth,
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
          left: menuPositions.prevProductsLeftFromWindow,
          width: menuPositions.prevProductsWidth,
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
          left: menuPositions.premiumProductsLeftFromWindow,
          width: menuPositions.premiumProductsWidth,
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
          onClick={() => toggleClassesHamMenu()}
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
