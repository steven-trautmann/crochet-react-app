import React, { useEffect, useState, useContext, useRef } from "react";
import "../style/modal.css";
import DisplayPictures from "./DisplayPictures";
import { ModalContext } from "../context/ModalContext";
import { FinishedModalTextsContext } from "../context/ModalTextsFinishedProducts";
import { useParams } from "react-router-dom";
import { InnerWidthContext } from "../context/InnerWidthContext";

export default function FinishedProducts(props) {
  const [ModalTexts, setModalTexts] = useContext(FinishedModalTextsContext);
  const [finishedProducts, setFinishedProducts] = useState({});
  const { type } = useParams();
  const [typeInHeader, setTypeInHeader] = useState("Helytelen URL!");
  const didMountRef = useRef(false);
  const [width] = useContext(InnerWidthContext);

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
      setFinishedProducts(
        importAll(
          require.context(
            "../images/finished_products/figures",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "plussok") {
      setTypeInHeader("Plüssök");
      setFinishedProducts(
        importAll(
          require.context(
            "../images/finished_products/figures2",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "ruhak") {
      setTypeInHeader("Ruhák");
      setFinishedProducts(
        importAll(
          require.context(
            "../images/finished_products/figures3",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "macskak") {
      setTypeInHeader("Macskák");
      setFinishedProducts(
        importAll(
          require.context(
            "../images/finished_products/figures4",
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
    <div>
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
          <div>
            {width > 1000 ? desktopModalContext() : mobileModalContext()}
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
            : "Kész Termékek | " + typeInHeader}
        </h1>

        <DisplayPictures pictures={finishedProducts} />
      </div>
    </div>
  );
}
