import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function MovingPicture() {
  return (
    <div
      style={{
        width: "80vw",
        margin: "auto",
        height: "30vw",
        marginTop: "6rem",
      }}
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "25vw", width: "80vw" }}
            src={`/sample_picture.jpg`}
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
            style={{ height: "25vw", width: "80vw" }}
            src={`/sample_picture.jpg`}
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
            style={{ height: "25vw", width: "80vw" }}
            src={`/sample_picture.jpg`}
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
    // <div
    //   style={{
    // width: "80vw",
    // margin: "auto",
    // paddingTop: "6rem",
    // height: "25vw",
    // paddingLeft: "1vw",
    // paddingRight: "1vw",
    //   }}
    // >
    //   <img
    //     src={`/sample_picture.jpg`}
    //     alt="kicsike"
    //     style={{
    //       height: "25vw",
    //       width: "80vw",
    //     }}
    //   />
    // </div>
  );
}
