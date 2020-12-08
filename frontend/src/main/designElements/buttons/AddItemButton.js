import React from "react";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom";
import {BsPlus} from "react-icons/bs";

export default function AddItemButton({bottomDistance}) {

    const history = useHistory();

    function handleAddElementButton() {
        history.push("/bo/addElement");
    }

    if (bottomDistance === "normal"){
        return(

            <StyledActionButton>
                    <BsPlus onClick={handleAddElementButton}/>
            </StyledActionButton>
        )
    }

    else if (bottomDistance === "large"){
        return(

            <StyledActionButton style={{bottom: "40px"}}>
                <BsPlus onClick={handleAddElementButton}/>
            </StyledActionButton>
        )
    }
}


const StyledActionButton = styled.div`
  padding: 10px 10px 5px 10px;
  border-radius: 50%;
  align-self: flex-start;
  background: var(--darkgreen);
  opacity: 85%;
  border: none;
  font: inherit;
  position: fixed;
  right: 25px;
  bottom: 12px;
  z-index: 1000;
  font-size: 1.8em;
  color: white;
`