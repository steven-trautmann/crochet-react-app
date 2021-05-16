import React, { memo } from "react";

export default memo(function DisplayPicWithoutDetails(props) {

    return (
        <div
            onClick={() => { props.setIncreasedImg(props.imgSrc) }}
            style={{
                margin: "auto", height: `${props.pictureSquareDistance}`, width: `${props.pictureSquareDistance}`
            }}>
            <img
                style={{ height: "100%", width: "100%" }}
                src={props.imgSrc}
                alt="crochetProduct"
            />
        </div>
    );
})
