import React, { useState, memo } from "react";
import imgStyle from "../style/prevProductsImg.module.css"
import ImgSuspense from "img-suspense";

export default memo(function DisplayPicWithoutDetails(props) {
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
            setContainerIdName(imgStyle.prevProductsContainerIncreased);
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
            <div
                style={{
                    margin: "auto", height: `${itsIncreased ? "auto" : props.pictureSquareDistance}`, width: `${itsIncreased ? "auto" : props.pictureSquareDistance}`
                }}>
                <ImgSuspense
                    style={{ height: `${itsIncreased ? "auto" : "100%"}`, width: `${itsIncreased ? "auto" : "100%"}`, maxWidth: "100vw", maxHeight: "100vh" }}
                    src={props.imgSrc}
                    alt="crochetProduct"
                    fallback={<img
                        src="/specialImages/loading.gif"
                        alt="loading"
                        style={{ height: `${itsIncreased ? "auto" : "100%"}`, width: `${itsIncreased ? "auto" : "100%"}`, maxWidth: "100vw", maxHeight: "100vh" }}
                    ></img>}
                />
            </div>
        </div>
    );
})
