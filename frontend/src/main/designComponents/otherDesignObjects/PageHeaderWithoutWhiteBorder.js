import React from "react";
import styled from "styled-components/macro";
import GradientBorderlineTop from "./GradientBorderlineTop";
import GreenBoxMedium from "./GreenBoxMedium";

export default function PageHeaderWithoutWhiteBorder({title}) {

    return (
        <>
            <PageHeaderTitle>{title}</PageHeaderTitle>
            <GradientBorderlineTop/>
            <GreenBoxMedium/>
        </>
    );
}

const PageHeaderTitle = styled.p`
    color: var(--darkgrey);
    text-decoration: none;
    margin: 6px;
    font-weight: bold;
    font-size: 1.3em;
    text-align: center;
`