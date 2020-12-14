import React, {useEffect, useContext} from "react";
import styled from "styled-components/macro";
import EcoElementContext from "./contexts/createContexts/EcoElementContext";
import {getEcoElements} from "./services/ecoElementService";
import FoodStoreList from "./list-map-route/FoodStoreList";
import RestaurantList from "./list-map-route/RestaurantList";
import FairShopList from "./list-map-route/FairShopList";
import AddItemButton from "./designComponents/buttons/AddItemButton";
import LoginContext from "./contexts/createContexts/LoginContext";
import FilterAndSwitchViewBar from "./list-map-route/FilterAndSwitchViewBar";
import FilterResultList from "./list-map-route/FilterResultList";
import FilterContext from "./contexts/createContexts/FilterContext";
import FashionStoreList from "./list-map-route/FashionStoreList";
import OthersList from "./list-map-route/OthersList";
import ReturnIfUserIsAllowedToGetRender from "./services/ReturnIfUserIsAllowedToGetRender";
import EmptyDivToClosePage from "./designComponents/otherDesignObjects/EmptyDivToClosePage";

export default function ListPage() {

    const {ecoElements, setEcoElements} = useContext(EcoElementContext);
    const {token} = useContext(LoginContext);
    const {filterIsActive} = useContext(FilterContext);

    //useEffect to load the ecoElements at page load
    useEffect(() => {
        getEcoElements(token, setEcoElements);
    }, [token, setEcoElements]);


    return(

        <>
            <FilterAndSwitchViewBar type="list"/>

            <ListSection>
                {!filterIsActive && <FoodStoreList ecoElements={ecoElements}/>}
                {!filterIsActive && <FashionStoreList ecoElements={ecoElements}/>}
                {!filterIsActive && <RestaurantList ecoElements={ecoElements}/>}
                {!filterIsActive && <FairShopList ecoElements={ecoElements}/>}
                {!filterIsActive && <OthersList ecoElements={ecoElements}/>}
                {filterIsActive && <FilterResultList ecoElements={ecoElements}/>}
                <EmptyDivToClosePage type="large"/>
                <WhiteSpaceAtTheBottom/>
            </ListSection>

            {ReturnIfUserIsAllowedToGetRender("anyUser") && <AddItemButton bottomDistance="normal"/>}
        </>
    );
}


const ListSection = styled.section`
  display: block;
  width: auto;
  height: 90vh;
  overflow: scroll;
  z-index: 5;
`

const WhiteSpaceAtTheBottom = styled.div`
  background: var(--main-background-color);
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 72px;
  z-index: 10;
`


