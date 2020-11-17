import React, { memo } from "react";
import ImgSuspense from "img-suspense";

export default memo(function DisplayPicWithoutDetails(props) {

    return (
        <div
            onClick={() => { props.setIncreasedImg(props.imgSrc) }}
            style={{
                margin: "auto", height: `${props.pictureSquareDistance}`, width: `${props.pictureSquareDistance}`
            }}>
            <ImgSuspense
                style={{ height: "100%", width: "100%" }}
                src={props.imgSrc}
                alt="crochetProduct"
                fallback={<img
                    src="/specialImages/loading.gif"
                    alt="loading"
                    style={{ height: "100%", width: "100%" }}
                ></img>}
            />
        </div>
    );
})
