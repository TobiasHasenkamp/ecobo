import styled from "styled-components/macro";
import {FaListUl} from "react-icons/fa";
import React from "react";

export default function ShowsAsListIconButton({handle}) {

    return (
        <ShowAsListIcon onClick={() => handle()}>
            <FaListUl/>
        </ShowAsListIcon>
    );
}

const ShowAsListIcon = styled.button`
  margin: 3px 10px;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  color: inherit;
`