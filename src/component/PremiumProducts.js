import React, { useEffect, useState } from "react";
import "../style/modal.css";
import DisplayPictures from "./DisplayPictures";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { PremiumModalTextsContext } from "../context/ModalTextsPremiumProducts";

export default function PremiumProducts(props) {
  const [premiumProducts, setPremiumProducts] = useState({});
  const { type } = useParams();
  const [typeInHeader, setTypeInHeader] = useState("Helytelen URL!");

  //change from prev_products to premium_products
  useEffect(() => {
    if (type === "figurak") {
      setTypeInHeader("Figurák");
      setPremiumProducts(
        importAll(
          require.context(
            "../images/prev_products/figures",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "takarok") {
      setTypeInHeader("Takarók");
      setPremiumProducts(
        importAll(
          require.context(
            "../images/prev_products/figures2",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "szundikendok") {
      setTypeInHeader("Szundikendők");
      setPremiumProducts(
        importAll(
          require.context(
            "../images/prev_products/figures",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "ruhak") {
      setTypeInHeader("Ruhák");
      setPremiumProducts(
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
      <Modal context={PremiumModalTextsContext} />
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

        <DisplayPictures pictures={premiumProducts} />
      </div>
    </div>
  );
}
