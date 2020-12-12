import styled from "styled-components/macro";
import React from "react";

export default function BlackLine() {
    return (
            <StyledBlackLine/>
    );
}

const StyledBlackLine = styled.div`
  display: block;
  width: 100%;
  background-color: var(--neutral-color-darkgrey);
  height: 2px;
`
