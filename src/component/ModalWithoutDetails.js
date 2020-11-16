import React, { useState, useEffect, useCallback } from "react";
import imgViewer from "../style/imgViewer.module.css"
import ImgSuspense from "img-suspense";

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

    return (
        <div id={containerIdName}
            style={{ top: offsetTop }}
            onClick={() => {
                decrease();
            }}>
            <div
                style={{
                    margin: "auto", height: "auto", width: "auto"
                }}>
                {props.imgSrc === "" ? null :
                    <ImgSuspense
                        style={{ height: "auto", width: "auto", maxWidth: "100vw", maxHeight: "100vh" }}
                        src={props.imgSrc}
                        alt="crochetProduct"
                        fallback={<img
                            src="/specialImages/loading.gif"
                            alt="loading"
                            style={{ height: "auto", width: "auto", maxWidth: "100vw", maxHeight: "100vh", borderRadius: "20%" }}
                        ></img>}
                    />
                }
            </div>
        </div>
    );
}
