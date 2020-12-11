import styled from "styled-components/macro";
import {FaTrash} from "react-icons/fa";
import React from "react";

export default function DeleteIconButton({handle, size}) {

    if (size === "small") {
        return (
            <DeleteIconButtonSmall onClick={() => handle()}>
                <FaTrash/>
            </DeleteIconButtonSmall>
        )
    } else {
        return (
            <DeleteIconButtonMedium onClick={() => handle()}>
                <FaTrash/>
            </DeleteIconButtonMedium>
        )
    }
}

const DeleteIconButtonSmall = styled.button`
  margin: 1px 4px 0 4px;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  font-size: 0.9em;
  color: inherit;
`

const DeleteIconButtonMedium = styled.button`
  margin: 0;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  font-size: 1.0em;
  color: inherit;
`