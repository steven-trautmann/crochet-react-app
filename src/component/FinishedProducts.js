import React, { useEffect, useState, useContext } from "react";
import "../style/modal.css";
import DisplayPictures from "./DisplayPictures";
import { ModalContext } from "../context/ModalContext";
import { ModalTextsContext } from "../context/ModalTextsFinishedProducts";

export default function FinishedProducts(props) {
  let modalInAnimation = false;
  let modalIsVisible = false;
  const [ModalTexts, setModalTexts] = useContext(ModalTextsContext);
  const [finishedProducts, setFinishedProducts] = useState({});
  const [
    modalSrc,
    setModalSrc,
    modalCounter,
    setModalCounter,
    modalName,
    setModalName,
  ] = useContext(ModalContext);

  useEffect(() => {
    if (modalSrc !== "") {
      showModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalCounter]);

  useEffect(() => {
    setFinishedProducts(
      importAll(
        require.context(
          "../images/finished_products",
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    );
  }, []);

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  useEffect(() => {
    setEventListenerOnModal();
  });

  function setEventListenerOnModal() {
    window.addEventListener("click", function (event) {
      let myModal = document.getElementById("myModal");
      if (event.target === myModal && !modalInAnimation && modalIsVisible) {
        fadeOutEffect();
      }
    });
  }

  function showModal() {
    let modal = document.getElementById("myModal");
    modal.style.opacity = 1;
    modal.style.display = "block";
    modalIsVisible = true;
  }

  function fadeOutEffect() {
    let myModal = document.getElementById("myModal");
    modalInAnimation = true;
    let i = 1000;
    let fadeInterval = setInterval(() => {
      myModal.style.opacity = i / 1000;
      i = i - 10;
      if (i < 0) {
        clearInterval(fadeInterval);
        modalInAnimation = false;
        modalIsVisible = false;
        myModal.style.display = "none";
      }
    }, 5);
  }

  return (
    <div>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <button
            class="close"
            onClick={() => {
              fadeOutEffect();
            }}
          >
            &times;
          </button>
          <h1>{modalName}</h1>
          <img src={modalSrc} alt="finished_product" />
          <h2>{ModalTexts[modalName]}</h2>
        </div>
      </div>
      <div style={{ marginTop: "6rem" }}>
        <h1>Kész Termékek</h1>

        <DisplayPictures needModal={true} pictures={finishedProducts} />
      </div>
    </div>
  );
}
