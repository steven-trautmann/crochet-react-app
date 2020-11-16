import React, { useContext, memo } from 'react';
import { InnerWidthContext } from "../context/InnerWidthContext";
import DisplayPicWithoutDetails from "./DisplayPicWithoutDetails";

const DisplayPicturesWithoutDetails = (props) => {
    const [width] = useContext(InnerWidthContext);

    let fromMobile = width < 1000;
    let pictureSquareDistance = fromMobile ? "32vw" : "17.5vw";
    let keyCounter = 0;

    return (
        <div
            className="picturesGrid"
            style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${pictureSquareDistance}, 1fr))`,
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

export default memo(DisplayPicturesWithoutDetails);
