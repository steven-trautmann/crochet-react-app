import React, { useState, useEffect, useContext } from "react";
import MovingPicture from "./MovingPicture";
import styled from "styled-components";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [width] = useContext(InnerWidthContext);

  let pictureSquareDistance = width > 1000 ? "17.5vw" : "32.5vw";

  const Img = styled.img`
    height: ${pictureSquareDistance};
    width: ${pictureSquareDistance};
    &:hover {
      cursor: pointer;
    }
  `;

  const GridDiv = styled.div`
    width: 90vw;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(${pictureSquareDistance}, 1fr)
    );
    justify-content: center;
    grid-gap: 3vw;
    place-items: center;
    margin: auto;
  `;

  return (
    <div>
      <MovingPicture />

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h1>Kész Termékek</h1>
      </div>

      <GridDiv>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/figurak"} style={{ color: "black" }}>
            <Img
              src="/homepageImgs/finishedSampleImgs/Figurák.jpg"
              alt="Figurák"
            />
            <h1
              style={{
                textAlign: "center",
              }}
            >
              Figurák
            </h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/plussok"} style={{ color: "black" }}>
            <Img
              src="/homepageImgs/finishedSampleImgs/Plüssök.jpg"
              alt="Plüssök"
            />
            <h1 style={{ textAlign: "center" }}>Plüssök</h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/ruhak"} style={{ color: "black" }}>
            <Img
              src={"/homepageImgs/finishedSampleImgs/Ruhák.jpg"}
              alt="Ruhák"
            />
            <h1 style={{ textAlign: "center" }}>Ruhák</h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/macskak"} style={{ color: "black" }}>
            <Img
              src={"/homepageImgs/finishedSampleImgs/Macskák.jpg"}
              alt="Macskák"
            />
            <h1 style={{ textAlign: "center" }}>Macskák</h1>
          </Link>
        </div>
      </GridDiv>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h1>Eddigi Munkáim</h1>
      </div>
      <GridDiv>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/eddigi-munkak/figurak"} style={{ color: "black" }}>
            <Img
              src="/homepageImgs/previousSampleImgs/csiga_biga.jpg"
              alt="Figurák"
            />
            <h1 style={{ textAlign: "center" }}>Figurák</h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/plussok"} style={{ color: "black" }}>
            <Img
              src="/homepageImgs/previousSampleImgs/csigusz.jpg"
              alt="Plüssök"
            />
            <h1 style={{ textAlign: "center" }}>Plüssök</h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/ruhak"} style={{ color: "black" }}>
            <Img
              src={"/homepageImgs/previousSampleImgs/csingula.jpg"}
              alt="Ruhák"
            />
            <h1 style={{ textAlign: "center" }}>Ruhák</h1>
          </Link>
        </div>

        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/macskak"} style={{ color: "black" }}>
            <Img
              src={"/homepageImgs/previousSampleImgs/mesztelen.jpg"}
              alt="Macskák"
            />
            <h1 style={{ textAlign: "center" }}>Macskák</h1>
          </Link>
        </div>
      </GridDiv>
    </div>
  );
}
