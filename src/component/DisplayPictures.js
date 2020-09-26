import React, { useContext } from "react";
import DisplayPic from "./DisplayPic";
import "../style/tableCard.css";
import { InnerWidthContext } from "../context/InnerWidthContext";

export default function DisplayPictures(props) {
  const [width] = useContext(InnerWidthContext);

  let pictureSquareDistance = width > 1000 ? "15vw" : "32.5vw";

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
      {Object.entries(props.pictures).map((image) => {
        let src = image.toString().split(",").pop();
        return (
          <div key={src}>
            <DisplayPic
              pictureSquareDistance={pictureSquareDistance}
              picture={src}
            ></DisplayPic>
          </div>
        );
      })}
    </div>
  );
}
