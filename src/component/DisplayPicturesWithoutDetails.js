import React, { useContext } from 'react';
import { InnerWidthContext } from "../context/InnerWidthContext";
import DisplayPicWithoutDetails from "./DisplayPicWithoutDetails";

const DisplayPicturesWithoutDetails = (props) => {
    const [width] = useContext(InnerWidthContext);

    let fromMobile = width < 1000;
    let pictureSquareDistance = fromMobile ? "32vw" : "17.5vw";
    let keyCounter = 0;

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
            {props.images.map((imgSrc) => {
                keyCounter++;
                return (
                    <DisplayPicWithoutDetails
                        key={keyCounter}
                        pictureSquareDistance={pictureSquareDistance}
                        imgSrc={imgSrc}
                    ></DisplayPicWithoutDetails>
                );
            })}
        </div>
    );
}

export default DisplayPicturesWithoutDetails;
