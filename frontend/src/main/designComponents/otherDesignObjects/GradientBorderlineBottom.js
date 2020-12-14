import styled from "styled-components/macro";
import React from "react";

export default function GradientBorderlineBottom() {

    return(
        <StyledDarkGradientLineTop/>
    );
}

const StyledDarkGradientLineTop = styled.div`
  display: block;
  width: 100%;
  height: 5px;
  background-image: linear-gradient(var(--neutral-color-lightgrey), var(--main-background-color));
`