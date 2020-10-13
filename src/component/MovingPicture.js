import React, { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

export default function MovingPicture() {
  const [width] = useContext(InnerWidthContext);

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
      <Carousel interval={10000}>
        <Carousel.Item>
          <Link to="/kesz-termekek/figurak">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/black.jpg`}
              alt="First slide"
            />
            <Carousel.Caption>
              <CarouselText>Figurák</CarouselText>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/kesz-termekek/takarok">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/takaro.jpg`}
              alt="Third slide"
            />
            <Carousel.Caption>
              <CarouselText>Takarók</CarouselText>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/kesz-termekek/szundikendok">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/szundikendo.jpg`}
              alt="Third slide"
            />
            <Carousel.Caption>
              <CarouselText>Szundikendők</CarouselText>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/kesz-termekek/ruhak">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/ruha.jpg`}
              alt="Fourth slide"
            />
            <Carousel.Caption>
              <CarouselText>Ruhák</CarouselText>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/rolam">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/rolam.jpg`}
              alt="Fourth slide"
            />
            <Carousel.Caption>
              <CarouselText>Rólam</CarouselText>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      </Carousel>
    </div >
  );
}
