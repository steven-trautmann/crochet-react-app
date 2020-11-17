import React, { useState, useCallback, useEffect, useContext, memo } from 'react';
import { Link } from "react-router-dom";
import { InnerWidthContext } from "../../context/InnerWidthContext";
import hamMenu from "../../style/hamburgerMenu.module.scss";
import linkStyle from "../../style/links.module.css";

const MobileNavBar = () => {
    const [collapsiblesAreSet, setCollapsiblesAreSet] = useState(false);
    const [width,] = useContext(InnerWidthContext);

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

    useEffect(() => {
        if (!collapsiblesAreSet) {
            setUpTheCollapsibleDropDownItems();
        }
    })

    const toggleClassesHambrMenu = () => {
        let hambrMenu = document.getElementsByClassName(hamMenu.hamburgerMenu);
        if (hambrMenu[0] == null) {
            //if the hamburger menu is displayed but the window resized to desktop
            let mobileMenu = document.getElementById("mobile");
            mobileMenu.classList.remove(hamMenu.hamburgerDropDown);
            mobileMenu.classList.add(hamMenu.hamburgerDropDownDisquise);
        } else {
            hambrMenu[0].classList.toggle(hamMenu.animate);
            if (width < 1380) {
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

    return (
        <>
            <div
                className={hamMenu.menuWrapper}
                onClick={() => {
                    toggleClassesHambrMenu();
                }}
            >
                <div className={hamMenu.hamburgerMenu}></div>
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
        </>
    );
}

export default memo(MobileNavBar);
