import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../style/tableCard.css";
import styled from "styled-components";

export default function DisplayPic(props) {
  const Img = styled.img`
    height: ${props.pictureSquareDistance};
    width: ${props.pictureSquareDistance};
  `;

  return (
    <div style={{ width: props.pictureSquareDistance }}>
      <Img src={props.picture} alt="crochetProduct" />
      <h1 style={{ textAlign: "center" }}>kincsi</h1>
    </div>
  );
}
