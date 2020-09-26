import React, { useContext } from "react";
import MovingPicture from "./MovingPicture";
import styled from "styled-components";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";
import "../style/homepage.css";
import "../style/links.css";

export default function HomePage() {
  const [width] = useContext(InnerWidthContext);

  let pictureSquareDistance = width > 1000 ? "17.5vw" : "32vw";

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
    <div id="homepage">
      <MovingPicture />
      {/* if from mobile or desktop */}
      <div style={{ marginTop: `${width > 1000 ? "0" : "1rem"}` }}>
        <h1>Kész Termékek</h1>
      </div>

      <GridDiv>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/figurak"} className="links">
            <Img
              src="/specialImages/homepageImgs/finishedSampleImgs/Figurák.jpg"
              alt="Figurák"
            />
            <h1>Figurák</h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/plussok"} className="links">
            <Img
              src="/specialImages/homepageImgs/finishedSampleImgs/Plüssök.jpg"
              alt="Plüssök"
            />
            <h1>Plüssök</h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/ruhak"} className="links">
            <Img
              src={"/specialImages/homepageImgs/finishedSampleImgs/Ruhák.jpg"}
              alt="Ruhák"
            />
            <h1>Ruhák</h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/macskak"} className="links">
            <Img
              src={"/specialImages/homepageImgs/finishedSampleImgs/Macskák.jpg"}
              alt="Macskák"
            />
            <h1>Macskák</h1>
          </Link>
        </div>
      </GridDiv>

      <div style={{ marginTop: "1rem" }}>
        <h1>Eddigi Munkáim</h1>
      </div>
      <GridDiv>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/eddigi-munkak/figurak"} className="links">
            <Img
              src="/specialImages/homepageImgs/previousSampleImgs/csiga_biga.jpg"
              alt="Figurák"
            />
            <h1>Figurák</h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/plussok"} className="links">
            <Img
              src="/specialImages/homepageImgs/previousSampleImgs/csigusz.jpg"
              alt="Plüssök"
            />
            <h1>Plüssök</h1>
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/ruhak"} className="links">
            <Img
              src={
                "/specialImages/homepageImgs/previousSampleImgs/csingula.jpg"
              }
              alt="Ruhák"
            />
            <h1>Ruhák</h1>
          </Link>
        </div>

        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/macskak"} className="links">
            <Img
              src={
                "/specialImages/homepageImgs/previousSampleImgs/mesztelen.jpg"
              }
              alt="Macskák"
            />
            <h1>Macskák</h1>
          </Link>
        </div>
      </GridDiv>
    </div>
  );
}
