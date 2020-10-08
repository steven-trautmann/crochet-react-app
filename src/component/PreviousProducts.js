import React, { useEffect, useState } from "react";
import "../style/modal.css";
import DisplayPictures from "./DisplayPictures";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { PreviousModalTextsContext } from "../context/ModalTextsPreviousProducts";

export default function PreviousProducts(props) {
  const [previousProducts, setPreviousProducts] = useState({});
  const { type } = useParams();
  const [typeInHeader, setTypeInHeader] = useState("Helytelen URL!");

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
            "../images/prev_products/figures",
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
            "../images/prev_products/figures2",
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
      return (images[item.replace("./", "")] = r(item));
    });
    return images;
  }

  return (
    <div>
      <Modal context={PreviousModalTextsContext} />
      <div style={{ marginTop: "6rem" }}>
        <h1
          style={{
            borderBottom: "solid",
            margin: "2rem",
            marginTop: 0,
            textAlign: "center"
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
