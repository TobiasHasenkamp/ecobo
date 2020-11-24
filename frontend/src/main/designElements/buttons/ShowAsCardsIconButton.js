import styled from "styled-components/macro";
import {FaBorderAll} from "react-icons/fa";
import React from "react";

export default function ShowAsCardsIconButton({handle}) {

    return (

        <>
            <StyledShowIconButton onClick={() => handle()}>
                <FaBorderAll/>
            </StyledShowIconButton>
        </>

    );

}

const StyledShowIconButton = styled.button`
  margin: 3px 10px;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  color: inherit;
`