

import styled from "styled-components/macro";
import {FaExclamationCircle} from "react-icons/fa";
import React from "react";

export default function ShowAsMapIconButton({handle}) {

    return (

        <>
            <StyledShowIconButton>
                <FaExclamationCircle/>
            </StyledShowIconButton>
        </>

    );

}

//todo: center this item and add it also to the list pages
const StyledShowIconButton = styled.button`
  margin: 3px 10px;
  align-self: center;
  padding: 0;
  background: transparent;
  border: none;
  font: inherit;
  color: inherit;
  font-size: 0.85em;
`