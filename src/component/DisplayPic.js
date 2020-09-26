import React, { useContext } from "react";
import "../style/tableCard.css";
import styled from "styled-components";
import { ModalContext } from "../context/ModalContext";

export default function DisplayPic(props) {
  const [
    // eslint-disable-next-line no-unused-vars
    modalSrc,
    setModalSrc,
    modalCounter,
    setModalCounter,
    // eslint-disable-next-line no-unused-vars
    modalName,
    setModalName,
  ] = useContext(ModalContext);

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

  function showModal() {
    setModalSrc(props.picture);
    setModalName(pictureName);
    if (10 < modalCounter) {
      setModalCounter(0);
    } else {
      setModalCounter(modalCounter + 1);
    }
  }

  return (
    <div style={{ width: props.pictureSquareDistance }} className={"tableCard"}>
      <Img
        onClick={() => {
          showModal();
        }}
        src={props.picture}
        alt="crochetProduct"
      />
      <h1
        onClick={() => {
          showModal();
        }}
      >
        {pictureName}
      </h1>
    </div>
  );
}
