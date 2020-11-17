import React from "react";
import styled from "styled-components/macro";
import GradientBorderlineBottom from "./designElements/GradientBorderlineBottom";
import GradientBorderlineTop from "./designElements/GradientBorderlineTop";
import GreenBoxMedium from "./designElements/GreenBoxMedium";

export default function PageHeader({title}) {

    return (

        <>
            <StyledTitle>{title}</StyledTitle>
            <GradientBorderlineTop/>
            <GreenBoxMedium/>
            <GradientBorderlineBottom/>
        </>

    );
}

const StyledTitle = styled.p`
    color: var(--darkgrey);
    text-decoration: none;
    margin: 6px;
    font-size: 1.3em;
    text-align: center;
    text-shadow: 0.8px 0.6px 0.3px var(--grey);
`