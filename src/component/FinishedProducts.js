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
            "../images/finished_products/figurák",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "takarok") {
      setTypeInHeader("Takarók");
      setFinishedProducts(
        importAll(
          require.context(
            "../images/finished_products/takarók",
            false,
            /\.(png|jpe?g|svg)$/
          )
        )
      );
    } else if (type === "szundikendok") {
      setTypeInHeader("Szundikendők");
      setFinishedProducts(
        importAll(
          require.context(
            "../images/finished_products/szundikendők",
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
            "../images/finished_products/ruhák",
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
            textAlign: "center"
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
