import styled from "styled-components/macro";
import {FaRegListAlt} from "react-icons/fa";
import React from "react";
import {useHistory} from "react-router-dom";

export default function ShowElementIconButton({elementId}) {

    const history = useHistory();

    function handleShowElement() {
        history.push("/bo/element/" + elementId);
    }

    return (

        <>
            <StyledShowIconButton onClick={() => handleShowElement()}>
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