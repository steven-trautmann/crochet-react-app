import React from 'react';
import styled from "styled-components";

const Title = styled.h1`
    border-bottom: solid;
    margin: 2rem;
    margin-top: 0;
    text-align: center;
`;

const PageTitle = (props) => {
    return (
        <Title>{props.text}</Title>
    );
}
export default PageTitle;
