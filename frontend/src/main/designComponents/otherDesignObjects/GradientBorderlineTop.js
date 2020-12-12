import styled from "styled-components/macro";
import React from "react";

export default function GradientBorderlineTop() {

    return(
        <StyledDarkGradientLineBottom/>
    );
}


const StyledDarkGradientLineBottom = styled.div`
  display: block;
  width: 100%;
  height: 5px;
  background-image: linear-gradient(var(--main-background-color), var(--neutral-color-lightgrey));
`