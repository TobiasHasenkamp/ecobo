import styled from "styled-components/macro";
import {FaEdit} from "react-icons/fa";
import React from "react";

export default function EditIconButtonMedium({handle}) {

    return (

        <>
            <StyledEditIconButton onClick={() => handle()}>
                <FaEdit/>
            </StyledEditIconButton>
        </>

    );

}

const StyledEditIconButton = styled.button`
  margin: 0 5px;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  font-size: 1.0em;
  color: inherit;
`