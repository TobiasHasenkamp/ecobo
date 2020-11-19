import styled from "styled-components/macro";
import React from "react";

export default function GreenBoxWithGradientBorderlineUntilSiteEnds () {

    return (

        <>
            <StyledDarkGreenGradientLineTop/>
            <StyledDarkGreenBox/>
        </>

    );

}

const StyledDarkGreenBox = styled.div`
  display: block;
  width: 100%;
  background-color: var(--darkgreen);
  height: 450px;
`

const StyledDarkGreenGradientLineTop = styled.div`
  display: block;
  width: 100%;
  height: 5px;
  background-image: linear-gradient(ghostwhite, var(--grey));
`