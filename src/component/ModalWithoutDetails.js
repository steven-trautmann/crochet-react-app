import React, { useState, useEffect, useCallback } from "react";
import imgViewer from "../style/imgViewer.module.css"
import styled from "styled-components";
import KeyDownHandler from "./KeyDownHandler";

const ArrowButton = styled.button`
    background-color: white;
    width: 10vw;
    opacity: 90%;
    border: 0;
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.5rem;
    &:focus{
        outline: none;
    }
`;

export default function ModalWithoutDetails(props) {
    const [offsetTop, setOffsetTop] = useState(0);
    const [containerIdName, setContainerIdName] = useState("");

    const decrease = useCallback(() => {
        setContainerIdName(imgViewer.decreasedImgContainer);
        props.setIncreasedImg("");
        enableScroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.imgSrc === "") {
            decrease();
        } else {
            disableScroll();
            setOffsetTop(window.scrollY);
            setContainerIdName(imgViewer.increasedImgContainer);
        }
    }, [decrease, props])

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

    function oneLeft(e) {
        e.stopPropagation();
        let currentIndex = props.imgSrcList.indexOf(props.imgSrc);
        if (currentIndex !== 0) {
            props.setIncreasedImg(props.imgSrcList[currentIndex - 1]);
        } else {
            decrease();
        }
    };

    function oneRight(e) {
        e.stopPropagation();
        let currentIndex = props.imgSrcList.indexOf(props.imgSrc);
        if (currentIndex < props.imgSrcList.length - 1) {
            props.setIncreasedImg(props.imgSrcList[currentIndex + 1]);
        } else {
            decrease();
        }
    }

    return (
        <div id={containerIdName}
            style={{ top: offsetTop }}
            onClick={() => {
                decrease();
            }}>
            <div
                style={{
                    margin: "auto", height: "auto", width: "auto", display: "flex"
                }}>
                {props.imgSrc === "" ? null :
                    <>
                        <KeyDownHandler escHandler={decrease} leftHandler={oneLeft} rightHandler={oneRight} />
                        {props.imgSrcList.indexOf(props.imgSrc) !== 0 ?
                            <ArrowButton onClick={(e) => { oneLeft(e) }}><img src="/specialImages/left.svg" alt="left" /></ArrowButton>
                            :
                            <ArrowButton>X</ArrowButton>
                        }
                        <img
                            style={{ height: "auto", width: "auto", maxWidth: "80vw", maxHeight: "100vh" }}
                            src={props.imgSrc}
                            alt="crochetProduct"
                        />
                        {props.imgSrcList.indexOf(props.imgSrc) < props.imgSrcList.length - 1 ?
                            <ArrowButton onClick={(e) => { oneRight(e) }}><img src="/specialImages/right.svg" alt="right" /></ArrowButton>
                            :
                            <ArrowButton>X</ArrowButton>
                        }
                    </>
                }
            </div>
        </div>
    );
}
