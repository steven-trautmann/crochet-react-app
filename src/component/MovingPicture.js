import React, { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { InnerWidthContext } from "../context/InnerWidthContext";
import { Link } from "react-router-dom";

export default function MovingPicture() {
  const [width] = useContext(InnerWidthContext);

  let fromMobile = width < 1000;

  return (
    <div
      style={{
        width: fromMobile ? "90vw" : "80vw",
        margin: "auto",
        height: fromMobile ? "33.25vw" : "30vw",
        marginTop: "6rem",
      }}
    >
      <Carousel interval="10000">
        <Carousel.Item>
          <Link to="/kesz-termekek/figurak">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/figura.jpg`}
              alt="First slide"
            />
          </Link>
          {/* you can add caption */}
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/eddigi-munkak/takarok">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/takaro.jpg`}
              alt="Third slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/eddigi-munkak/szundikendok">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/szundikendo.jpg`}
              alt="Third slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/eddigi-munkak/ruhak">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/black.jpg`}
              alt="Fourth slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/eddigi-munkak/rolam">
            <img
              className="d-block w-100"
              style={{ height: fromMobile ? "33vw" : "25vw" }}
              src={`/specialImages/homepageImgs/movingImages/rolam.jpg`}
              alt="Fourth slide"
            />
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
