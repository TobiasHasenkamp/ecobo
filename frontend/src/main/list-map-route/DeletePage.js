import PageHeader from "../PageHeader";
import React, {useContext, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {deleteEcoElement, getEcoElementById} from "../services/ecoElementService";
import LoginContext from "../contexts/createContexts/LoginContext";
import EcoElementContext from "../contexts/createContexts/EcoElementContext";
import styled from "styled-components/macro";
import translationService from "../services/translationService";

export default function DeletePage() {

    const history = useHistory();
    const {ecoElementIDParam} = useParams();
    const {token} = useContext(LoginContext);
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
            <PageHeader title={`Lösche ${ecoElement.name}`}/>
            <StyledForm>
                <p>Möchtest Du dieses Element wirklich löschen?</p> <br/>
                <div>
                    <p>Name: {ecoElement.name}</p>
                    <p>ID: {ecoElement.id}</p>
                    <p>Kategorie: {translationService(ecoElement.category)}</p>
                    <p>Typ: {translationService(ecoElement.categorySub)}</p>
                    <p>Addresse: {ecoElement.address}</p>
                    <p>erstellt von: {ecoElement.creator}</p>
                    <p>Erstelldatum: {ecoElement.dateCreatedExternal}</p>
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