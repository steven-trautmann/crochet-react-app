import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../style/tableCard.css";
import styled from "styled-components";

export default function DisplayPicHomepage(props) {
  const Img = styled.img`
    height: ${props.pictureSquareDistance};
    width: ${props.pictureSquareDistance};
    &:hover {
      cursor: pointer;
    }
  `;

  let sliceFrom = props.picture.lastIndexOf("/") + 1;
  let sliceTo = props.picture.indexOf(".");
  let pictureName = props.picture.slice(sliceFrom, sliceTo);

  return (
    <div style={{ width: props.pictureSquareDistance }}>
      <Img src={props.picture} alt="crochetProduct" />
      <h1 style={{ textAlign: "center" }}>{pictureName}</h1>
    </div>
  );
}
