import styled from "styled-components/macro";
import React from "react";
import BlackLine from "./BlackLine";

export default function GreenBoxUntilSiteEnds() {

    return (
            <StyledDiv>
                <BlackLine/>
                <StyledGreenBox/>
            </StyledDiv>
    );
}

const StyledGreenBox = styled.div`
  width: 100%;
  background-color: var(--main-color);
  height: 138px;
`

const StyledDiv = styled.div`
  width: 100%;
  background-color: var(--main-color);
`