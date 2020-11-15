import React, { useContext, memo } from "react";
import MovingPicture from "./MovingPicture";
import styled from "styled-components";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";
import ImgSuspense from "img-suspense";

import homepageStyle from "../style/homepage.module.css";
import linkStyle from "../style/links.module.css";
import "../style/globalImg.css";

export default memo(function HomePage() {
  const [width] = useContext(InnerWidthContext);

  let fromMobile = width < 1000;
  let pictureSquareDistance = fromMobile ? "32vw" : "17.5vw";

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
      {/* if from mobile or desktop */}
      <div style={{ marginTop: `${fromMobile ? "1rem" : "0"}` }}>
        <h1 style={{ textAlign: "center" }}>Kész Termékek</h1>
      </div>

      <GridDiv className={homepageStyle.homepageTable}>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/figurak"} className={linkStyle.links}>
            <ImgSuspense
              src="/specialImages/homepageImgs/finishedSampleImgs/Figurák.jpg"
              style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              fallback={<img
                src="/specialImages/loading.gif"
                alt="loading"
                style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              ></img>}
              alt="Figurák"
            />
            {fromMobile ? <h2>Figurák</h2> : <h1>Figurák</h1>}
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/takarok"} className={linkStyle.links}>
            <ImgSuspense
              src="/specialImages/homepageImgs/finishedSampleImgs/Takarók.jpg"
              style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              fallback={<img
                src="/specialImages/loading.gif"
                alt="loading"
                style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              ></img>}
              alt="Takarók"
            />
            {fromMobile ? <h2>Takarók</h2> : <h1>Takarók</h1>}
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/szundikendok"} className={linkStyle.links}>
            <ImgSuspense
              src="/specialImages/homepageImgs/finishedSampleImgs/Szundikendők.jpg"
              style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              fallback={<img
                src="/specialImages/loading.gif"
                alt="loading"
                style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              ></img>}
              alt="Szundikendők"
            />
            {fromMobile ? <h3>Szundikendők</h3> : <h2>Szundikendők</h2>}
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/sapkak"} className={linkStyle.links}>
            <ImgSuspense
              src="/specialImages/homepageImgs/finishedSampleImgs/Sapkák.jpg"
              style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              fallback={<img
                src="/specialImages/loading.gif"
                alt="loading"
                style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              ></img>}
              alt="Sapkák"
            />
            {fromMobile ? <h2>Sapkák</h2> : <h1>Sapkák</h1>}
          </Link>
        </div>
      </GridDiv>
    </div>
  );
})
