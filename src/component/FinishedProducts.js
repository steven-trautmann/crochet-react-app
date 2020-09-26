import React, { useEffect, useState } from "react";
import "../style/modal.css";
import DisplayPictures from "./DisplayPictures";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { FinishedModalTextsContext } from "../context/ModalTextsFinishedProducts";

export default function FinishedProducts(props) {
  const [finishedProducts, setFinishedProducts] = useState({});
  const { type } = useParams();
  const [typeInHeader, setTypeInHeader] = useState("Helytelen URL!");

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
      return (images[item.replace("./", "")] = r(item));
    });
    return images;
  }

  return (
    <div>
      <Modal context={FinishedModalTextsContext} />
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
