import PageHeader from "./PageHeader";
import React, {useEffect, useContext} from "react";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom"
import EcoElementContext from "./contexts/EcoElementContext";
import {getEcoElements} from "./controller/EcoElementController";
import FoodStoreList from "./list-route/FoodStoreList";
import RestaurantList from "./list-route/RestaurantList";
import FairShopList from "./list-route/FairShopList";

export default function ListPageNew() {

    const history = useHistory();
    const {ecoElements, setEcoElements} = useContext(EcoElementContext);

    useEffect(() => {
        getEcoElements().then(setEcoElements);
    }, [setEcoElements]);

    function handleEditElement() {
        history.push("/404");
    }

    return(

        <div>

            <PageHeader title="EcoMap"/>
            <StyledWrapperDiv>
                <FoodStoreList ecoElements={ecoElements} handleEditElement={handleEditElement}/>
                <RestaurantList ecoElements={ecoElements} handleEditElement={handleEditElement}/>
                <FairShopList ecoElements={ecoElements} handleEditElement={handleEditElement}/>

                {/* at the moment necessary to keep the full list visible when scrolling */}
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </StyledWrapperDiv>

        </div>

    );

}


const StyledWrapperDiv = styled.div`
  display: block;
  width: auto;
  height: 90vh;
  overflow: scroll;
`

