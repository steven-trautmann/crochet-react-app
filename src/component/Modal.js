import React, { useEffect, useContext, useRef } from "react";
import "../style/modal.css";
import { ModalContext } from "../context/ModalContext";
import { InnerWidthContext } from "../context/InnerWidthContext";
import Carousel from "react-bootstrap/Carousel";

function Modal(props) {
  const [ModalTexts] = useContext(props.context);

  const [width] = useContext(InnerWidthContext);
  const [
    modalSrc,
    // eslint-disable-next-line no-unused-vars
    setModalSrc,
    modalCounter,
    // eslint-disable-next-line no-unused-vars
    setModalCounter,
    modalName,
    // eslint-disable-next-line no-unused-vars
    setModalName,
    hasListener,
    setHasListener,
  ] = useContext(ModalContext);

  const didMountRef = useRef(false);

  useEffect(() => {
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

  function toggleModalVisibility() {
    let modal = document.getElementById("myModal");
    if (modal.classList.contains("modalInvisible")) {
      modal.classList.remove("modalInvisible");
      modal.classList.add("modalVisible");
    } else {
      modal.classList.remove("modalVisible");
      modal.classList.add("modalInvisible");
    }
  }

  function desktopModalContext() {
    return (
      <div>
        <div style={{ display: "inline-block", width: "30vw", height: "30vw" }}>
          {/* <img
            src={modalSrc}
            alt="finished_product"
            style={{ width: "30vw", height: "30vw" }}
          /> */}
          <Carousel>
            {modalSrc.map((src) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ height: "30vw", width: "30vw" }}
                    src={src}
                    alt="slide"
                  />
                </Carousel.Item>
              )
            })}
          </Carousel>
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
          <h2>{ModalTexts[modalName]}</h2>
        </div>
      </div>
    );
  }

  function mobileModalContext() {
    return (
      <div>
        <div style={{ margin: "auto", textAlign: "center" }}>

          {/* <img
            src={modalSrc}
            alt="finished_product"
            style={{ width: "60vw", height: "60vw" }}
          /> */}
          <Carousel>
            {modalSrc.map((src) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ height: "60vw", width: "60vw" }}
                    src={src}
                    alt="First slide"
                  />
                </Carousel.Item>
              )
            })}
          </Carousel>

        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            height: "22vh",
            overflow: "auto",
          }}
        >
          <h2>{ModalTexts[modalName]}</h2>
        </div>
      </div>
    );
  }

  return (
    <div id="myModal" className="modalInvisible">
      <div className="modal-content">
        <button
          style={{ position: "absolute", right: "2vw" }}
          className="close"
          onClick={() => {
            toggleModalVisibility();
          }}
        >
          &times;
        </button>

        <h1 style={{ borderBottom: "solid", marginBottom: "5vh" }}>
          {modalName}
        </h1>

        {modalSrc !== "" ? <div>{width > 1000 ? desktopModalContext() : mobileModalContext()}</div> : null}
      </div>
    </div>
  );
}

export default Modal;
