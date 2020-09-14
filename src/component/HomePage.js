import React, { useState, useEffect } from "react";
import DisplayPictures from "./DisplayPictures";
import MovingPicture from "./MovingPicture";
import styled from "styled-components";

export default function AllDefaultCities() {
  const [finishedProducts, setFinishedProducts] = useState({});
  const [prev_products, setPrev_products] = useState({});

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

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
    setPrev_products(
      importAll(
        require.context("../images/prev_products", false, /\.(png|jpe?g|svg)$/)
      )
    );
  }, []);

  return (
    <div>
      <MovingPicture />

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h1>Kész termékek</h1>
      </div>
      <DisplayPictures pictures={finishedProducts}></DisplayPictures>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h1>Eddigi Munkáim</h1>
      </div>
      <DisplayPictures pictures={prev_products}></DisplayPictures>
    </div>
  );
}
