import React from "react";
import styled from "styled-components/macro";
import GradientBorderlineBottom from "./GradientBorderlineBottom";
import GradientBorderlineTop from "./GradientBorderlineTop";
import GreenBoxMedium from "./GreenBoxMedium";

export default function PageHeader({title}) {

    return (
        <>
            <PageHeaderTitle>{title}</PageHeaderTitle>
            <GradientBorderlineTop/>
            <GreenBoxMedium/>
            <GradientBorderlineBottom/>
        </>
    );
}

const PageHeaderTitle = styled.p`
    color: var(--neutral-color-darkgrey);
    text-decoration: none;
    margin: 6px;
    font-weight: bold;
    font-size: 1.2em;
    text-align: center;
       
    @media (max-width:425px) {
    font-size: 1.15em;    
        
    @media (max-width:350px) {
    font-size: 1.0em;
    
    @media (max-width:300px) {
    font-size: 0.9em;
  }
`