import styled from "styled-components/macro";
import React from "react";

export default function GreenBoxLargeWithGradientBorderline () {

    return (

        <>
            <StyledDarkGreenGradientLineTop/>
            <StyledDarkGreenBox/>
            <StyledDarkGreenGradientLineBottom/>
        </>

    );

}

const StyledDarkGreenBox = styled.div`
  display: block;
  width: 100%;
  background-color: var(--darkgreen);
  height: 35px;
`

const StyledDarkGreenGradientLineTop = styled.div`
  display: block;
  width: 100%;
  height: 5px;
  background-image: linear-gradient(ghostwhite, var(--grey));
`

const StyledDarkGreenGradientLineBottom = styled.div`
  display: block;
  width: 100%;
  height: 5px;
  background-image: linear-gradient(var(--grey), ghostwhite);
`