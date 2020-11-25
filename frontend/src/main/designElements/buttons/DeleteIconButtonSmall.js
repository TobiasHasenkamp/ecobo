import styled from "styled-components/macro";
import {FaTrash} from "react-icons/fa";
import React from "react";

export default function DeleteIconButtonSmall({handle}) {

    return (

        <>
            <StyledDeleteIconButton onClick={() => handle()}>
                <FaTrash/>
            </StyledDeleteIconButton>
        </>

    );

}

const StyledDeleteIconButton = styled.button`
  margin: 1px 4px 0 4px;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  font-size: 0.9em;
  color: inherit;
`