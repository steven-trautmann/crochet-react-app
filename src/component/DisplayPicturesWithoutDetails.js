import React, { useContext } from 'react';
import { InnerWidthContext } from "../context/InnerWidthContext";
import DisplayPicWithoutDetails from "./DisplayPicWithoutDetails";

const DisplayPicturesWithoutDetails = (props) => {
    const [width] = useContext(InnerWidthContext);

    let fromMobile = width < 1000;
    let pictureSquareDistance = fromMobile ? "32vw" : "17.5vw";
    let keyCounter = 0;

    let allImgSrc = [];

    for (let imageSrc of Object.entries(props.images)) {
        let src = imageSrc.toString().split(",").pop();
        allImgSrc.push(src);
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
            {allImgSrc.map((imgSrc) => {
                keyCounter++;
                return (
                    <div key={keyCounter}>
                        <DisplayPicWithoutDetails
                            pictureSquareDistance={pictureSquareDistance}
                            imgSrc={imgSrc}
                        ></DisplayPicWithoutDetails>
                    </div>
                );
            })}
        </div>
    );
}

export default DisplayPicturesWithoutDetails;
