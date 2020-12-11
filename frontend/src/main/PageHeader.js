import React from "react";
import styled from "styled-components/macro";
import GradientBorderlineBottom from "./designComponents/otherDesignObjects/GradientBorderlineBottom";
import GradientBorderlineTop from "./designComponents/otherDesignObjects/GradientBorderlineTop";
import GreenBoxMedium from "./designComponents/otherDesignObjects/GreenBoxMedium";

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
    font-weight: bold;
    font-size: 1.3em;
    text-align: center;
`