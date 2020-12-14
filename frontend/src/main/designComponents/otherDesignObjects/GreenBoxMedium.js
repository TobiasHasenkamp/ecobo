import styled from "styled-components/macro";
import React from "react";

export default function GreenBoxMedium() {

    return (
            <StyledGreenBox/>
    );
}

const StyledGreenBox = styled.div`
  display: block;
  width: 100%;
  background-color: var(--main-color);
  height: 25px;
`
