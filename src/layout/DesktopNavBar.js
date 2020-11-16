import React, { useState, useCallback, useEffect, useContext, memo } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { InnerWidthContext } from "../context/InnerWidthContext";
import navBar from "../style/navBar.module.css";
import linkStyle from "../style/links.module.css";

const DesktopNav = styled.div`
  text-align: center;
  display: inline-flex;
`;

const DesktopNavBar = () => {
    const [menuPositions, setMenuPositions] = useState({
        finishedProductsLeftFromWindow: 0,
        finishedProductsWidth: 0,
    })
    const [width,] = useContext(InnerWidthContext);

    const setDropdownPositions = useCallback(() => {
        let finishedDropDownButton = document.getElementById("finishedProductsButton");
        setMenuPositions({
            finishedProductsLeftFromWindow: finishedDropDownButton.offsetLeft,
            finishedProductsWidth: finishedDropDownButton.offsetWidth,
        })
    }, []);

    useEffect(() => {
        if (width > 1380) {
            setDropdownPositions();
        }
    }, [setDropdownPositions, width]);

    useEffect(() => {
        closeAllNavBarSubmenus();
    }, []);

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

    useEffect(() => {
        //Clicking out of dropdown
        window.onclick = function (e) {
            if (!e.target.matches("#finishedProductsButton")) {
                closeAllNavBarSubmenus();
            }
        };
        return () => {
            window.onclick = null;
        };
    }, []);

    return (
        <div>
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
            <div>
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
            </div>
        </div>
    );
}

export default memo(DesktopNavBar);
