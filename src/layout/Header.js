import React, { useContext, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";

import hamMenu from "../style/hamburgerMenu.module.scss";
import navBar from "../style/navBar.module.css";
import linkStyle from "../style/links.module.css";

const TopNav = styled.div`
    overflow: hidden;
    background-color: white;
    position: fixed;
    margin: 0;
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

const DesktopNav = styled.div`
    text-align: center;
    display: inline-flex;
  `;

export default function Header() {
  const [width, setWidth] = useContext(InnerWidthContext);
  let fromMobile = 1380 > width;
  const [collapsiblesAreSet, setCollapsiblesAreSet] = useState(false);

  const [menuPositions, setMenuPositions] = useState({
    finishedProductsLeftFromWindow: 0,
    finishedProductsWidth: 0,
  })


  const setUpTheCollapsibleDropDownItems = useCallback(() => {
    let coll = document.getElementsByClassName(hamMenu.collapsible);

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
  }, []);

  const setDropdownPositions = useCallback(() => {
    let finishedDropDownButton = document.getElementById("finishedProductsButton");
    setMenuPositions({
      finishedProductsLeftFromWindow: finishedDropDownButton.offsetLeft,
      finishedProductsWidth: finishedDropDownButton.offsetWidth,
    })
  }, []);

  useEffect(() => {
    window.addEventListener("load", () => {
      if (!fromMobile) {
        setDropdownPositions();
      }
      if (!collapsiblesAreSet) {
        setUpTheCollapsibleDropDownItems();
      }
    });
  }, [setDropdownPositions, setUpTheCollapsibleDropDownItems, collapsiblesAreSet, fromMobile]);

  useEffect(() => {
    if (!fromMobile) {
      setDropdownPositions();
    }
  }, [fromMobile, setDropdownPositions, width]);

  useEffect(() => {
    closeAllNavBarSubmenus();
  }, [fromMobile]);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [setWidth]);

  function triggerToggleDropDown(e) {
    let buttonName = e.target.name;
    let myDropdown;

    if (buttonName === "finishedProductsDropper") {
      myDropdown = document.getElementById(navBar.finishedProducts);
    }

    if (myDropdown.classList.contains(navBar.dropDownDisquise)) {
      myDropdown.classList.remove(navBar.dropDownDisquise);
      myDropdown.classList.add(navBar.dropDown);
    } else {
      myDropdown.classList.remove(navBar.dropDown);
      myDropdown.classList.add(navBar.dropDownDisquise);
    }
  }

  function closeAllNavBarSubmenus() {
    let finishedDropDown = document.getElementById(navBar.finishedProducts);
    if (finishedDropDown.classList.contains(navBar.dropDown)) {
      finishedDropDown.classList.remove(navBar.dropDown);
      finishedDropDown.classList.add(navBar.dropDownDisquise);
    }
  }

  //Clicking out of dropdown
  window.onclick = function (e) {
    if (!e.target.matches("#finishedProductsButton")) {
      closeAllNavBarSubmenus();
    }
  };

  const toggleClassesHambrMenu = () => {
    let hambrMenu = document.getElementsByClassName(hamMenu.hamburgerMenu);
    if (hambrMenu[0] == null) {
      //if the hamburger menu is displayed but the window resized to desktop
      let mobileMenu = document.getElementById("mobile");
      mobileMenu.classList.remove(hamMenu.hamburgerDropDown);
      mobileMenu.classList.add(hamMenu.hamburgerDropDownDisquise);
    } else {
      hambrMenu[0].classList.toggle(hamMenu.animate);
      if (fromMobile === true) {
        let mobileMenu = document.getElementById("mobile");
        if (mobileMenu.classList.contains(hamMenu.hamburgerDropDownDisquise)) {
          mobileMenu.classList.remove(hamMenu.hamburgerDropDownDisquise);
          mobileMenu.classList.add(hamMenu.hamburgerDropDown);
        } else {
          mobileMenu.classList.remove(hamMenu.hamburgerDropDown);
          mobileMenu.classList.add(hamMenu.hamburgerDropDownDisquise);
        }
      }
    }
  };

  const displayHamburgerMenu = () => {
    return (
      <div
        className={hamMenu.menuWrapper}
        onClick={() => {
          toggleClassesHambrMenu();
        }}
      >
        <div className={hamMenu.hamburgerMenu}></div>
      </div>
    );
  };

  const displayNavBar = () => {
    return (
      <DesktopNav>
        <button
          className={navBar.navItem}
          id="finishedProductsButton"
          name="finishedProductsDropper"
          onClick={triggerToggleDropDown}
        >
          Kész Termékek
        </button>
        <Link className={`${navBar.navItem} ${linkStyle.links}`} to="/eddigi-munkak">
          Eddigi Munkáim
        </Link>
        <Link className={`${navBar.navItem} ${linkStyle.links}`} to="/rolam">
          Rólam
        </Link>
        <Link className={`${navBar.navItem} ${linkStyle.links}`} to="/kapcsolat">
          Kapcsolat
        </Link>
      </DesktopNav>
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

        {!fromMobile ? displayNavBar() : displayHamburgerMenu()}
      </TopNav>
      <div
        id={navBar.finishedProducts}
        style={{
          left: menuPositions.finishedProductsLeftFromWindow,
          width: menuPositions.finishedProductsWidth,
          textAlign: "center",
        }}
        className={navBar.dropDownDisquise}
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
          <Link to="/kesz-termekek/sapkak">
            <li>Sapkák</li>
          </Link>
        </ul>
      </div>

      <div id="mobile" className={hamMenu.hamburgerDropDownDisquise}>
        <button
          style={{
            fontSize: "0.5rem",
            float: "right",
            marginBottom: "0rem",
            background: "white",
            fontFamily: "auto",
            outline: "black",
          }}
          onClick={() => toggleClassesHambrMenu()}
        >
          X
        </button>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <button
              style={{ outline: "none" }}
              className={`${hamMenu.collapsible} ${hamMenu.hamburgerNavItem}`}
            >
              Kész Termékek
            </button>
            <div style={{ borderRadius: "20%" }} className={hamMenu.content}>
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
                <Link to="/kesz-termekek/sapkak">
                  <li>Sapkák</li>
                </Link>
              </ul>
            </div>
          </li>
          <Link className={`${hamMenu.hamburgerNavItem} ${linkStyle.links}`} to="/eddigi-munkak">
            <li>Eddigi Munkáim</li>
          </Link>
          <Link className={`${hamMenu.hamburgerNavItem} ${linkStyle.links}`} to="/rolam">
            <li>Rólam</li>
          </Link>
          <Link className={`${hamMenu.hamburgerNavItem} ${linkStyle.links}`} to="/kapcsolat">
            <li>Kapcsolat</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
