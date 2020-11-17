import React, { useState, useEffect, useContext, useRef, memo } from "react";
import KeyDownHandler from "./KeyDownHandler";
import { ModalContext } from "../context/ModalContext";
import { InnerWidthContext } from "../context/InnerWidthContext";
import Carousel from "react-bootstrap/Carousel";
import modalStyle from "../style/modal.module.css";

function Modal(props) {
  const [modalIndex, setModalIndex] = useState(0);
  const didMountRef = useRef(false);
  const [ModalTexts] = useContext(props.context);
  const [width] = useContext(InnerWidthContext);
  const [
    modalSrc,
    ,
    modalCounter,
    ,
    modalName,
    ,
    hasListener,
    setHasListener,
  ] = useContext(ModalContext);

  const handleSelect = (selectedIndex, e) => {
    setModalIndex(selectedIndex);
  };

  useEffect(() => {
    setModalIndex(0);
    if (didMountRef.current) {
      if (modalSrc !== "") {
        toggleModalVisibility();
      }
    } else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalCounter]);

  useEffect(() => {
    if (!hasListener) {
      window.addEventListener("click", function (event) {
        let myModal = document.getElementById("myModal");
        if (event.target === myModal) {
          toggleModalVisibility();
        }
      });
      setHasListener(true);
    }
  }, [hasListener, setHasListener]);

  const oneLeft = () => {
    if (modalIndex === 0) {
      setModalIndex(modalSrc.length - 1)
    } else {
      setModalIndex(modalIndex - 1)
    }
  }

  const oneRight = () => {
    if (modalIndex === modalSrc.length - 1) {
      setModalIndex(0)
    } else {
      setModalIndex(modalIndex + 1)
    }
  }

  function toggleModalVisibility() {
    let modal = document.getElementById("myModal");
    if (modal.classList.contains(modalStyle.modalInvisible)) {
      modal.classList.remove(modalStyle.modalInvisible);
      modal.classList.add(modalStyle.modalVisible);
    } else {
      modal.classList.remove(modalStyle.modalVisible);
      modal.classList.add(modalStyle.modalInvisible);
    }
  }

  function generateCarousel() {
    return (
      <Carousel touch={false} fade={true} pause="hover" interval={20000} activeIndex={modalIndex} onSelect={handleSelect}>
        {modalSrc.map((src) => {
          return (
            <Carousel.Item key={src} style={{ transition: "transform 1s ease, opacity 1.25s ease-out" }}>
              <div style={{
                backgroundImage: `url(/specialImages/loading.gif)`,
                backgroundRepeat: "no-repeat", backgroundColor: "white",
                backgroundPosition: "center",
                backgroundSize: `${width > 1000 ? "20vw" : "50vw"}`
              }}>
                <img
                  className="d-block w-100"
                  style={width > 1000 ?
                    { height: "30vw", width: "30vw" }
                    :
                    { height: "60vw", width: "60vw" }}
                  src={src}
                  alt="slide"
                  decoding="async"
                />
              </div>
            </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }

  function desktopModalContext() {
    return (
      <>
        <h1 style={{ borderBottom: "solid", marginBottom: "5vh", textAlign: "center" }}>
          {modalName}
        </h1>
        <KeyDownHandler escHandler={toggleModalVisibility} leftHandler={oneLeft} rightHandler={oneRight} />
        <div style={{ display: "inline-block", width: "30vw", height: "30vw" }}>
          {generateCarousel()}
        </div>
        <div
          style={{
            display: "inline-block",
            width: "45vw",
            height: "30vw",
            verticalAlign: "top",
            marginLeft: "3vw",
            overflow: "auto",
          }}
        >
          <h2>{ModalTexts[modalName + " szöveg"]}</h2>
          <h2>{ModalTexts[modalName + " méret"]}</h2>
          <h2>{ModalTexts[modalName + " anyag"]}</h2>
          <h2>{ModalTexts[modalName + " additional"]}</h2>
          <h1 style={{ marginLeft: "0", textAlign: "inherit", marginTop: "1rem" }}>{ModalTexts[modalName + " ár"]}</h1>
        </div>
      </>
    );
  }

  function mobileModalContext() {
    return (
      <>
        <h2 style={{ borderBottom: "solid", marginBottom: "5vh", textAlign: "center" }}>
          {modalName}
        </h2>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", width: "60vw", height: "60vw" }}>
            {generateCarousel()}
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            height: "22vh",
            overflow: "auto",
          }}
        >
          <h4>{ModalTexts[modalName + " szöveg"]}</h4>
          <h4>{ModalTexts[modalName + " méret"]}</h4>
          <h4>{ModalTexts[modalName + " anyag"]}</h4>
          <h4>{ModalTexts[modalName + " additional"]}</h4>
          <h3 style={{ marginLeft: "0", textAlign: "inherit", marginTop: "1rem" }}>{ModalTexts[modalName + " ár"]}</h3>
        </div>
      </>
    );
  }

  return (
    <div id="myModal" className={modalStyle.modalInvisible}>
      <div className={modalStyle.modalContent}>
        <button
          className={modalStyle.close}
          onClick={() => {
            toggleModalVisibility();
          }}
        >
          &times;
        </button>

        {modalSrc !== "" ? <>{width > 1000 ? desktopModalContext() : mobileModalContext()}</> : null}
      </div>
    </div>
  );
}

export default memo(Modal);
