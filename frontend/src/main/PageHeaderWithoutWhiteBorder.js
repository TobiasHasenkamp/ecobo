import React from "react";
import styled from "styled-components/macro";
import GradientBorderlineTop from "./designElements/GradientBorderlineTop";
import GreenBoxMedium from "./designElements/GreenBoxMedium";

export default function PageHeaderWithoutWhiteBorder({title}) {

    return (

        <>
            <StyledTitle>{title}</StyledTitle>
            <GradientBorderlineTop/>
            <GreenBoxMedium/>
        </>

    );
}

const StyledTitle = styled.p`
    color: var(--darkgrey);
    text-decoration: none;
    margin: 6px;
    font-weight: bold;
    font-size: 1.3em;
    text-align: center;
`