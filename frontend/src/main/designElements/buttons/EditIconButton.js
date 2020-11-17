import styled from "styled-components/macro";
import {FaEdit} from "react-icons/fa";
import React from "react";

export default function EditIconButton({handle}) {

    return (

        <>
            <StyledEditIconButton onClick={() => handle()}>
                <FaEdit/>
            </StyledEditIconButton>
        </>

    );

}

const StyledEditIconButton = styled.button`
  margin: 0;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  color: inherit;
`