import React, { useEffect, useContext, useRef } from "react";
import "../style/modal.css";
import { ModalContext } from "../context/ModalContext";
import { PreviousModalTextsContext } from "../context/ModalTextsPreviousProducts";
import { InnerWidthContext } from "../context/InnerWidthContext";

function Modal() {
  const [ModalTexts] = useContext(PreviousModalTextsContext);
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
    window.addEventListener("click", function (event) {
      let myModal = document.getElementById("myModal");
      if (event.target === myModal) {
        toggleModalVisibility();
      }
    });
  }, []);

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
        <div style={{ display: "inline-block" }}>
          <img
            src={modalSrc}
            alt="finished_product"
            style={{ width: "30vw", height: "30vw" }}
          />
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
          <img
            src={modalSrc}
            alt="finished_product"
            style={{ width: "60vw", height: "60vw" }}
          />
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
        <div>{width > 1000 ? desktopModalContext() : mobileModalContext()}</div>
      </div>
    </div>
  );
}

export default Modal;
