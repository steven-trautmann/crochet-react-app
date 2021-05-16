import React, { useContext, memo } from "react";
import MovingPicture from "./MovingPicture";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";

import homepageStyle from "../style/homepage.module.css";
import linkStyle from "../style/links.module.css";
import "../style/globalImg.css";
import "../style/carouselControls.css";
import "../style/picturesGrid.css";

export default memo(function HomePage() {
  const [width] = useContext(InnerWidthContext);

  let fromMobile = width < 1000;
  let pictureSquareDistance = fromMobile ? "32vw" : "17.5vw";

  return (
    <div>
      <MovingPicture />
      {/* if from mobile or desktop */}
      <div style={{ marginTop: `${fromMobile ? "1rem" : "0"}` }}>
        <h1 style={{ textAlign: "center" }}>Kész Termékek</h1>
      </div>

      <div className={`${homepageStyle.homepageTable} picturesGrid`}
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${pictureSquareDistance}, 1fr))`,
        }}>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/figurak"} className={linkStyle.links}>
            <img
              src="/specialImages/homepageImgs/finishedSampleImgs/Figurák.jpg"
              style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              alt="Figurák"
            />
            {fromMobile ? <h2>Figurák</h2> : <h1>Figurák</h1>}
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/takarok"} className={linkStyle.links}>
            <img
              src="/specialImages/homepageImgs/finishedSampleImgs/Takarók.jpg"
              style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              alt="Takarók"
            />
            {fromMobile ? <h2>Takarók</h2> : <h1>Takarók</h1>}
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/szundikendok"} className={linkStyle.links}>
            <img
              src="/specialImages/homepageImgs/finishedSampleImgs/Szundikendők.jpg"
              style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              alt="Szundikendők"
            />
            {fromMobile ? <h3>Szundikendők</h3> : <h2>Szundikendők</h2>}
          </Link>
        </div>
        <div style={{ width: pictureSquareDistance }}>
          <Link to={"/kesz-termekek/sapkak"} className={linkStyle.links}>
            <img
              src="/specialImages/homepageImgs/finishedSampleImgs/Sapkák.jpg"
              style={{ height: pictureSquareDistance, width: pictureSquareDistance }}
              alt="Sapkák"
            />
            {fromMobile ? <h2>Sapkák</h2> : <h1>Sapkák</h1>}
          </Link>
        </div>
      </div>
    </div>
  );
})
