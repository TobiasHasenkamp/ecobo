import PageHeader from "./PageHeader";
import React, {useEffect, useContext} from "react";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom"
import EcoElementContext from "./contexts/EcoElementContext";
import {getEcoElements} from "./controller/EcoElementController";
import FoodStoreList from "./list-route/FoodStoreList";
import RestaurantList from "./list-route/RestaurantList";
import FairShopList from "./list-route/FairShopList";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function ListPage() {

    const history = useHistory();
    const {ecoElements, setEcoElements} = useContext(EcoElementContext);



    useEffect(() => {
        getEcoElements().then(setEcoElements);
    }, [setEcoElements]);


    function handleEditElement() {
        history.push("/404");
    }

    function handleAddElementButton() {
        history.push("/bo/addElement");
    }

    return(

        <div>

            <PageHeader title="EcoMap"/>
            <StyledWrapperDiv>
                <FoodStoreList ecoElements={ecoElements} handleEditElement={handleEditElement}/>
                <RestaurantList ecoElements={ecoElements} handleEditElement={handleEditElement}/>
                <FairShopList ecoElements={ecoElements} handleEditElement={handleEditElement}/>

                {/* the brs are necessary at the moment to keep the full list visible when scrolling */}
                <br/>
                <StyledActionButton>
                    <Fab color="primary" aria-label="add" size="small" onClick={handleAddElementButton}>
                        <AddIcon />
                    </Fab>
                </StyledActionButton>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </StyledWrapperDiv>
            <StyledBottomDiv/>



        </div>

    );

}


const StyledWrapperDiv = styled.div`
  display: block;
  width: auto;
  height: 90vh;
  overflow: scroll;
  z-index: 5;
`

const StyledBottomDiv = styled.div`
  background: white;
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 65px;
  z-index: 10;
`

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
  z-index: 100;
`

