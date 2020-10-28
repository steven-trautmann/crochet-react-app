import React from "react";
import styled from "styled-components";
import "../style/links.css";

const Img = styled.img`
    &:hover {
      cursor: pointer;
    }
  `;

export default function DisplayPicWithoutDetails(props) {

    return (
        <div style={{ width: props.pictureSquareDistance }}>
            <Img
                style={{ height: `${props.pictureSquareDistance}`, width: `${props.pictureSquareDistance}` }}
                src={props.imgSrc}
                alt="crochetProduct"
            />
        </div>
    );
}
