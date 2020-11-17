import React, { useContext, memo } from 'react';
import { InnerWidthContext } from "../../context/InnerWidthContext";
import DisplayPicWithoutDetails from "./DisplayPicWithoutDetail";

const DisplayPicturesWithoutDetails = (props) => {
    const [width] = useContext(InnerWidthContext);

    let fromMobile = width < 1000;
    let pictureSquareDistance = fromMobile ? "32vw" : "17.5vw";
    let keyCounter = -1;

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
                        setIncreasedImg={props.setIncreasedImg}
                    ></DisplayPicWithoutDetails>
                );
            })}
        </div>
    );
}

export default memo(DisplayPicturesWithoutDetails);
