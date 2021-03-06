import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import linkStyle from "../../style/links.module.css";

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
    <div style={{ width: props.pictureSquareDistance }}>
      <img
        style={{ height: `${props.pictureSquareDistance}`, width: `${props.pictureSquareDistance}` }}
        onClick={() => {
          showModal();
        }}
        src={props.pictureSrcGroup[0]}
        alt="crochetProduct"
      />
      {props.fromMobile ?
        <h3 className={linkStyle.links}
          style={{ marginTop: "0.5rem", textAlign: "center", height: "4rem" }}
          onClick={() => {
            showModal();
          }}
        >
          {pictureName}
        </h3>
        :
        <h2 className={linkStyle.links}
          style={{ marginTop: "0.5rem", textAlign: "center", height: "4rem" }}
          onClick={() => {
            showModal();
          }}
        >
          {pictureName}
        </h2>
      }
    </div>
  );
}
