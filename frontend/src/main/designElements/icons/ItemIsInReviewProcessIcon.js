

import styled from "styled-components/macro";
import {FaExclamationCircle} from "react-icons/fa";
import React from "react";

export default function ItemIsInReviewProcessIcon() {

    return (
        <IsInReviewProcessIcon>
            <FaExclamationCircle/>
        </IsInReviewProcessIcon>
    );

}

const IsInReviewProcessIcon = styled.button`
  margin: 2px 8px;
  align-self: center;
  padding: 0;
  background: transparent;
  border: none;
  font: inherit;
  color: inherit;
  font-size: 0.75em;
`