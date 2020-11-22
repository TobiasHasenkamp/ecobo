import styled from "styled-components/macro";
import React from "react";

export default function GreenBoxWithGradientBorderlineUntilSiteEnds () {

    return (

        <>
            <StyledDiv>
                <StyledDarkGreenGradientLineTop/>
                <StyledDarkGreenBox/>
            </StyledDiv>
        </>

    );

}

const StyledDarkGreenBox = styled.div`
  width: 100%;
  background-color: var(--darkgreen);
  min-height: 250px;
  max-height: 250px;
`

const StyledDiv = styled.div`
  width: 100%;
  background-color: var(--darkgreen);
  min-height: 250px;
  max-height: 350px;
`

const StyledDarkGreenGradientLineTop = styled.div`
  width: 100%;
  height: 5px;
  background-image: linear-gradient(ghostwhite, var(--grey));
`