import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom";

export default function AddItemButton() {

    const history = useHistory();

    function handleAddElementButton() {
        history.push("/bo/addElement");
    }

    return(

        <StyledActionButton>
            <Fab color="primary" aria-label="add" size="medium" onClick={handleAddElementButton}>
                <AddIcon />
            </Fab>
        </StyledActionButton>
    )

}


const StyledActionButton = styled.div`
  margin: 0;
  padding: 0;
  align-self: flex-start;
  background: transparent;
  border: none;
  font: inherit;
  color: inherit;
  position: fixed;
  right: 25px;
  bottom: 15px;
  z-index: 1000;
`