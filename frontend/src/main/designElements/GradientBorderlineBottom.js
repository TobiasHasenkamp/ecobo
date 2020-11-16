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
  height: 7px;
  background-image: linear-gradient(var(--grey), ghostwhite);
`