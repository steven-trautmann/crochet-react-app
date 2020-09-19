import React, { useEffect, useState, useContext, useRef } from "react";
import "../style/modal.css";
import DisplayPictures from "./DisplayPictures";
import { ModalContext } from "../context/ModalContext";
import { PreviousModalTextsContext } from "../context/ModalTextsPreviousProducts";
import { useParams } from "react-router-dom";

export default function PreviousProducts(props) {
  const [ModalTexts, setModalTexts] = useContext(PreviousModalTextsContext); // !!!!!!!!!!!!!!!!!!!
  const [previousProducts, setPreviousProducts] = useState({});
  const { type } = useParams();
  const [typeInHeader, setTypeInHeader] = useState("Helytelen URL!");
  const didMountRef = useRef(false);

  const [
    modalSrc,
    setModalSrc,
    modalCounter,
    setModalCounter,
    modalName,
    setModalName,
  ] = useContext(ModalContext);

  useEffect(() => {
    if (type === "figurak") {
      setTypeInHeader("Figurák");
      setPreviousProducts(
        importAll(
          require.context(
            "../images/prev_products/figures",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "plussok") {
      setTypeInHeader("Plüssök");
      setPreviousProducts(
        importAll(
          require.context(
            "../images/prev_products/figures2",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "ruhak") {
      setTypeInHeader("Ruhák");
      setPreviousProducts(
        importAll(
          require.context(
            "../images/prev_products/figures3",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "macskak") {
      setTypeInHeader("Macskák");
      setPreviousProducts(
        importAll(
          require.context(
            "../images/prev_products/figures4",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    }
  }, [type]);

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

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

  return (
    <div>
      <div id="myModal" class="modalInvisible">
        <div class="modal-content">
          <button
            class="close"
            onClick={() => {
              toggleModalVisibility();
            }}
          >
            &times;
          </button>

          <h1 style={{ borderBottom: "solid", marginBottom: "5vh" }}>
            {modalName}
          </h1>
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
                width: "40vw",
                verticalAlign: "top",
                marginLeft: "3vw",
              }}
            >
              <h2>{ModalTexts[modalName]}</h2>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "6rem" }}>
        <h1
          style={{
            borderBottom: "solid",
            margin: "2rem",
            marginTop: 0,
          }}
        >
          {typeInHeader === "Helytelen URL!"
            ? typeInHeader
            : "Eddigi Munkák | " + typeInHeader}
        </h1>

        <DisplayPictures pictures={previousProducts} />
      </div>
    </div>
  );
}
