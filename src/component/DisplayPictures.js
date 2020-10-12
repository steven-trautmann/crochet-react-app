import React, { useContext } from "react";
import DisplayPic from "./DisplayPic";
import { InnerWidthContext } from "../context/InnerWidthContext";

export default function DisplayPictures(props) {
  const [width] = useContext(InnerWidthContext);

  let fromMobile = width < 1000;
  let pictureSquareDistance = fromMobile ? "32vw" : "17.5vw";
  let keyCounter = 0;

  let listOfImgGroups = [];

  let listOfAllSrc = [];

  let srcSet = new Set();

  for (let imageSrc of Object.entries(props.pictures)) {
    let src = imageSrc.toString().split(",").pop();
    listOfAllSrc.push(src);
    console.log(src);
    let sliceFrom = src.lastIndexOf("/") + 1;
    let sliceTo = src.indexOf(".");
    srcSet.add(src.slice(sliceFrom, sliceTo - 1));
  }

  for (let singleSrc of srcSet) {
    let newGroup = [];
    for (let normalSrc of listOfAllSrc) {
      let sliceFrom = normalSrc.lastIndexOf("/") + 1;
      let sliceTo = normalSrc.indexOf(".");
      if (normalSrc.slice(sliceFrom, sliceTo - 1) === singleSrc) {
        newGroup.push(normalSrc);
      }
    }
    listOfImgGroups.push(newGroup);
  }

  return (
    <div
      style={{
        width: "90vw",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${pictureSquareDistance}, 1fr))`,
        justifyContent: "center",
        gridGap: "3vw",
        placeItems: "center",
        margin: "auto",
      }}
    >
      {listOfImgGroups.map((imageSrcGroup) => {
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
}
