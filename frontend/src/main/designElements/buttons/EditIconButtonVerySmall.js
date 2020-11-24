import styled from "styled-components/macro";
import {FiEdit2} from "react-icons/fi";
import React from "react";

export default function EditIconButtonVerySmall({handle}) {

    return (

        <>
            <StyledEditIconButton onClick={() => handle()}>
                <sup><FiEdit2/></sup>
            </StyledEditIconButton>
        </>

    );

}

const StyledEditIconButton = styled.button`
  margin: 0 2px;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  font-size: 0.75em;
  color: inherit;
`