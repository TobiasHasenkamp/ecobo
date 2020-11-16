import React from "react";
import styled from "styled-components/macro";

export default function PageHeader({title}) {

    return (

        <>
            <StyledDarkGradientLineTop/>
            <StyledTitle>{title}</StyledTitle>
            <StyledDarkGradientLineBottom/>
            <StyledDarkGreenBox/>
            <StyledDarkGradientLineTop/>
        </>

    );
}



const StyledDarkGradientLineBottom = styled.div`
  display: block;
  width: 100%;
  height: 7px;
  background-image: linear-gradient(ghostwhite, var(--grey));
`

const StyledDarkGradientLineTop = styled.div`
  display: block;
  width: 100%;
  height: 7px;
  background-image: linear-gradient(var(--grey), ghostwhite);
`

const StyledDarkGreenBox = styled.div`
  display: block;
  width: 100%;
  background-color: var(--darkgreen);
  height: 25px;
`

const StyledTitle = styled.p`
    color: black;
    margin: 6px;
    font-size: 1.3em;
    text-align: center;
    text-shadow: 0.8px 0.6px 0.3px var(--grey);
`