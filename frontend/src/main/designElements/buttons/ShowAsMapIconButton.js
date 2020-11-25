import styled from "styled-components/macro";
import {FaMapMarkerAlt} from "react-icons/fa";
import React from "react";

export default function ShowAsMapIconButton({handle}) {

    return (

        <>
            <StyledShowIconButton onClick={() => handle()}>
                <FaMapMarkerAlt/>
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