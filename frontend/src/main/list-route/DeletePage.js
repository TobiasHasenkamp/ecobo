import PageHeader from "../PageHeader";
import React, {useContext, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {deleteEcoElement, getEcoElementById} from "../services/EcoElementService";
import LoginTokenContext from "../contexts/LoginTokenContext";
import EcoElementContext from "../contexts/EcoElementContext";
import styled from "styled-components/macro";

export default function DeletePage() {

    const history = useHistory();
    const {ecoElementIDParam} = useParams();
    const {token} = useContext(LoginTokenContext);
    const {ecoElement, setEcoElement} = useContext(EcoElementContext);

    useEffect(() => {
        getEcoElementById(ecoElementIDParam, token, setEcoElement);
    }, [ecoElementIDParam, setEcoElement, token]);

    function handleDeleteButtonClick(){
        deleteEcoElement(ecoElement.id, token);
        history.push("/bo/map");
    }

    function handleCancelButtonClick(){
        history.push("/bo/element/" + ecoElement.id)
    }

    return(

        <div>
            <PageHeader title={`Delete ${ecoElement.name}`}/>
            <StyledForm>
                <p>Do you really want to delete this item?</p> <br/>
                <div>
                    <p>Name: {ecoElement.name}</p>
                    <p>ID: {ecoElement.id}</p>
                    <p>Creator: {ecoElement.creator}</p>
                    <p>Category: {ecoElement.category}</p>
                    <p>Subcategory: {ecoElement.categorySub}</p>
                    <p>Address: {ecoElement.address}</p>
                    <p>Date created: {ecoElement.dateCreatedExternal}</p>
                </div> <br/>

                <div>
                    <button onClick={handleDeleteButtonClick}>Confirm changes</button>
                    <button onClick={handleCancelButtonClick}>Cancel</button>
                </div>

            </StyledForm>
        </div>

    );

}


const StyledForm = styled.div`
  margin: 24px;
  
  div {
    line-height: 0.8em;
    font-size: 0.8em;
  }
  
  button {
    margin: 0 6px;
  }
`