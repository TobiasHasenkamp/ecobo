import styled from "styled-components/macro";
import React from "react";

export default function GreenBoxLarge() {

    return (

        <>
            <StyledDarkGreenBox/>
        </>

    );

}

const StyledDarkGreenBox = styled.div`
  display: block;
  width: 100%;
  background-color: var(--darkgreen);
  height: 35px;
`
