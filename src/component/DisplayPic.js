import React, { useContext } from "react";
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
  let samplePicture = props.pictureSrcGroup[0];
  let sliceFrom = samplePicture.lastIndexOf("/") + 1;
  let sliceTo = samplePicture.indexOf(".");
  let pictureName = samplePicture.slice(sliceFrom, sliceTo - 1);

  function showModal() {
    setModalSrc(props.pictureSrcGroup);
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
        src={props.pictureSrcGroup[0]}
        alt="crochetProduct"
      />
      <h1
        style={{ fontSize: "2rem", marginTop: "0.5rem", textAlign: "center" }}
        onClick={() => {
          showModal();
        }}
      >
        {pictureName}
      </h1>
    </div>
  );
}
