import styled from "styled-components/macro";
import {FaRegListAlt} from "react-icons/fa";
import React from "react";

export default function ShowElementIconButton({handle}) {

    return (

        <>
            <StyledShowIconButton onClick={() => handle()}>
                <FaRegListAlt/>
            </StyledShowIconButton>
        </>

    );

}

const StyledShowIconButton = styled.button`
  margin: 0;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  color: inherit;
`