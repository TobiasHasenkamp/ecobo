import styled from "styled-components/macro";
import React from "react";

export default function GreenBoxSmall() {

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
  height: 12px;
`
