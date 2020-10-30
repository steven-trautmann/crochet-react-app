import React, { useState } from "react";
import styled from "styled-components";
import "../style/links.css";
import "../style/prevProductsImg.css"

const Img = styled.img`
    &:hover {
      cursor: pointer;
    }
  `;

export default function DisplayPicWithoutDetails(props) {
    const [itsIncreased, setIntsIncreased] = useState(false);
    const [offsetTop, setOffsetTop] = useState(0);
    const [containerIdName, setContainerIdName] = useState("");

    const toggleClassName = () => {
        if (itsIncreased) {
            setOffsetTop(0);
            setContainerIdName("");
            enableScroll();
            setIntsIncreased(false);
        } else {
            setOffsetTop(window.scrollY);
            setContainerIdName("prevProductsContainerIncreased");
            disableScroll();
            setIntsIncreased(true);
        }
    }

    function disableScroll() {
        // Get the current page scroll position 
        let scrollTop = window.scrollY;
        let scrollLeft = window.scrollX;

        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
    }

    function enableScroll() {
        window.onscroll = function () { };
    }

    return (
        <div id={containerIdName}
            style={{ top: itsIncreased ? offsetTop : null }}
            onClick={() => { toggleClassName() }}>
            <div style={{ display: "inline-block", height: `${itsIncreased ? "100%" : props.pictureSquareDistance}`, width: `${itsIncreased ? "auto" : props.pictureSquareDistance}` }}>
                <Img
                    style={{ height: "100%", width: "100%" }}
                    src={props.imgSrc}
                    alt="crochetProduct"
                />
            </div>
        </div>
    );
}
