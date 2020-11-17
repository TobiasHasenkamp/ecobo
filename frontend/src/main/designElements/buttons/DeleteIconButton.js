import styled from "styled-components/macro";
import {FaTrash} from "react-icons/fa";
import React from "react";

export default function DeleteIconButton({handle}) {

    return (

        <>
            <StyledDeleteIconButton onClick={() => handle()}>
                <FaTrash/>
            </StyledDeleteIconButton>
        </>

    );

}

const StyledDeleteIconButton = styled.button`
  margin: 0;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  color: inherit;
`