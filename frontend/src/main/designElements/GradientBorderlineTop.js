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
  height: 7px;
  background-image: linear-gradient(ghostwhite, var(--grey));
`