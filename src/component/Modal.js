import React, { useState, useEffect, useContext, useRef } from "react";
import { ModalContext } from "../context/ModalContext";
import { InnerWidthContext } from "../context/InnerWidthContext";
import Carousel from "react-bootstrap/Carousel";
import modalStyle from "../style/modal.module.css";

function Modal(props) {
  const [ModalTexts] = useContext(props.context);

  const [modalIndex, setModalIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setModalIndex(selectedIndex);
  };

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

  function desktopModalContext() {
    return (
      <div>
        <div style={{ display: "inline-block", width: "30vw", height: "30vw" }}>
          <Carousel fade={true} pause="hover" interval={20000} activeIndex={modalIndex} onSelect={handleSelect}>
            {modalSrc.map((src) => {
              return (
                <Carousel.Item key={src} style={{ transition: "transform 1s ease, opacity 1.25s ease-out" }}>
                  <div style={{
                    backgroundImage: `url(/specialImages/loading.gif)`,
                    backgroundRepeat: "no-repeat", backgroundColor: "white",
                    backgroundPosition: "center", backgroundSize: "20vw"
                  }}>
                    <img
                      className="d-block w-100"
                      style={{ height: "30vw", width: "30vw" }}
                      src={src}
                      alt="slide"
                      decoding="async"
                    />
                  </div>
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
          <h2>{ModalTexts[modalName + " szöveg"]}</h2>
          <h2>{ModalTexts[modalName + " méret"]}</h2>
          <h2>{ModalTexts[modalName + " anyag"]}</h2>
          <h2>{ModalTexts[modalName + " additional"]}</h2>
          <h1 style={{ marginLeft: "0", textAlign: "inherit", marginTop: "1rem" }}>{ModalTexts[modalName + " ár"]}</h1>
        </div>
      </div>
    );
  }

  function mobileModalContext() {
    return (
      <div>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", width: "60vw", height: "60vw" }}>
            <Carousel fade={true} pause="hover" interval={20000} activeIndex={modalIndex} onSelect={handleSelect}>
              {modalSrc.map((src) => {
                return (
                  <Carousel.Item key={src} style={{ transition: "transform 1s ease, opacity 1.25s ease-out" }}>
                    <div style={{
                      backgroundImage: `url(/specialImages/loading.gif)`,
                      backgroundRepeat: "no-repeat", backgroundColor: "white",
                      backgroundPosition: "center", backgroundSize: "50vw"
                    }}>
                      <img
                        className="d-block w-100"
                        style={{ height: "60vw", width: "60vw" }}
                        src={src}
                        alt="slide"
                        decoding="async"
                      />
                    </div>
                  </Carousel.Item>
                )
              })}
            </Carousel>
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
      </div>
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

        {width > 1000 ? <h1 style={{ borderBottom: "solid", marginBottom: "5vh", textAlign: "center" }}>
          {modalName}
        </h1>
          :
          <h2 style={{ borderBottom: "solid", marginBottom: "5vh", textAlign: "center" }}>
            {modalName}
          </h2>}

        {modalSrc !== "" ? <div>{width > 1000 ? desktopModalContext() : mobileModalContext()}</div> : null}
      </div>
    </div>
  );
}

export default Modal;
