import React, { useContext, useState, memo } from "react";
import Carousel from "react-bootstrap/Carousel";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

import black from "../images/movingImages/black.jpg";
import blanket from "../images/movingImages/takaro.jpg";
import napCloth from "../images/movingImages/szundikendo.jpg";
import cap from "../images/movingImages/sapka.jpg";
import picAboutMe from "../images/movingImages/rolam.jpg";

const CarouselText = styled.h1`
  background: rgba(192, 192, 192, 0.6);
  font-size: 4vw;
  color: black;
  font-weight: 600;
  width: 21vw;
  border-radius: 20%;
  margin: auto;
  padding: 0.5vw;
`;

export default memo(function MovingPicture() {
  const [width] = useContext(InnerWidthContext);
  const [images,] = useState(
    [{ url: black, pageName: "Figurák", linkUrl: "kesz-termekek/figurak" },
    { url: blanket, pageName: "Takarók", linkUrl: "kesz-termekek/takarok" },
    { url: napCloth, pageName: "Szundikendők", linkUrl: "kesz-termekek/szundikendok" },
    { url: cap, pageName: "Sapkák", linkUrl: "kesz-termekek/sapkak" },
    { url: picAboutMe, pageName: "Rólam", linkUrl: "rolam" }]);

  let fromMobile = width < 1000;

  return (
    <div
      style={{
        width: "80vw",
        margin: "auto",
        height: fromMobile ? "33.25vw" : "30vw",
        marginTop: "6rem",
      }}
    >
      <Carousel touch={false} interval={10000}>
        {images.map((image) => {
          return <Carousel.Item key={image.pageName}>
            <Link to={`/${image.linkUrl}`}>
              <div style={{
                backgroundImage: `url(/specialImages/loading.gif)`,
                backgroundRepeat: "no-repeat", backgroundColor: "white",
                backgroundPosition: "center", backgroundSize: fromMobile ? "25vw" : "18vw"
              }}>
                <img
                  className="d-block w-100"
                  style={{ height: fromMobile ? "33vw" : "25vw" }}
                  src={image.url}
                  alt="First slide"
                  decoding="async"
                />
              </div>
              <Carousel.Caption>
                <CarouselText>{image.pageName}</CarouselText>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        })}
      </Carousel>
    </div >
  );
})
