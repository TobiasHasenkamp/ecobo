import styled from "styled-components/macro";
import React from "react";
import BlackLineMedium from "./BlackLineMedium";

export default function GreenBoxWithGradientBorderlineUntilSiteEnds () {

    return (

        <>
            <StyledDiv>
                <BlackLineMedium/>
                <StyledDarkGreenBox/>
            </StyledDiv>
        </>

    );

}

const StyledDarkGreenBox = styled.div`
  width: 100%;
  background-color: var(--darkgreen);
  height: 138px;
`

const StyledDiv = styled.div`
  width: 100%;
  background-color: var(--darkgreen);
`