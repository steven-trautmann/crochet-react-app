import React, { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { InnerWidthContext } from "../context/InnerWidthContext";

export default function MovingPicture() {
  const [width, setWidth] = useContext(InnerWidthContext);

  let fromMobile = width < 1200;

  return (
    <div
      style={{
        width: fromMobile ? "90vw" : "80vw",
        margin: "auto",
        height: fromMobile ? "33.25vw" : "30vw",
        marginTop: "6rem",
      }}
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: fromMobile ? "33vw" : "25vw" }}
            src={`/homepageImgs/movingImages/sample_picture.jpg`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: fromMobile ? "33vw" : "25vw" }}
            src={`/homepageImgs/movingImages/sample_picture.jpg`}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: fromMobile ? "33vw" : "25vw" }}
            src={`/homepageImgs/movingImages/sample_picture.jpg`}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
