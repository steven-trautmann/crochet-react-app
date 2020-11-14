import React, { useContext, memo } from "react";
import DisplayPic from "./DisplayPic";
import { InnerWidthContext } from "../context/InnerWidthContext";
import "../style/displayPicturesGrid.css";

export default memo(function DisplayPictures(props) {
  const [width] = useContext(InnerWidthContext);

  let fromMobile = width < 1000;
  let pictureSquareDistance = fromMobile ? "32vw" : "17.5vw";
  let keyCounter = 0;

  const createImgGroups = () => {
    let listOfImgGroups = [];
    let listOfAllSrc = [];
    let srcSet = new Set();

    for (let imageSrc of Object.entries(props.pictures)) {
      let src = imageSrc.toString().split(",").pop();
      listOfAllSrc.push(src);
      let sliceFrom = src.lastIndexOf("/") + 1;
      let sliceTo = src.indexOf(".");
      let simpleSrc = src.slice(sliceFrom, sliceTo);
      let digitsOfCounter = simpleSrc.replace(/[^0-9]/g, '').length;
      srcSet.add(simpleSrc.slice(0, simpleSrc.length - digitsOfCounter));
    }

    for (let singleSrc of srcSet) {
      let newGroup = [];
      for (let normalSrc of listOfAllSrc) {
        let sliceFrom = normalSrc.lastIndexOf("/") + 1;
        let sliceTo = normalSrc.indexOf(".");
        let simpleSrc = normalSrc.slice(sliceFrom, sliceTo);
        let digitsOfCounter = simpleSrc.replace(/[^0-9]/g, '').length;
        if (simpleSrc.slice(0, simpleSrc.length - digitsOfCounter) === singleSrc) {
          newGroup.push(normalSrc);
        }
      }
      listOfImgGroups.push(newGroup);
    }

    return listOfImgGroups;
  }

  return (
    <div
      className="picturesGrid"
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${pictureSquareDistance}, 1fr))`,
      }}
    >
      {createImgGroups().map((imageSrcGroup) => {
        keyCounter++;
        return (
          <div key={keyCounter}>
            <DisplayPic
              fromMobile={fromMobile}
              pictureSquareDistance={pictureSquareDistance}
              pictureSrcGroup={imageSrcGroup}
            ></DisplayPic>
          </div>
        );
      })}
    </div>
  );
})
