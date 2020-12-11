import React, {useEffect, useContext} from "react";
import styled from "styled-components/macro";
import EcoElementContext from "./contexts/createContexts/EcoElementContext";
import {getEcoElements} from "./services/ecoElementService";
import FoodStoreList from "./list-map-route/FoodStoreList";
import RestaurantList from "./list-map-route/RestaurantList";
import FairShopList from "./list-map-route/FairShopList";
import AddItemButton from "./designElements/buttons/AddItemButton";
import LoginContext from "./contexts/createContexts/LoginContext";
import TabBarWithIcons from "./list-map-route/TabBarWithIcons";
import FilterResultList from "./list-map-route/FilterResultList";
import FilterContext from "./contexts/createContexts/FilterContext";
import FashionStoreList from "./list-map-route/FashionStoreList";
import OthersList from "./list-map-route/OthersList";
import ReturnIfUserIsAllowedToGetRender from "./list-map-route/subComponents/ReturnIfUserIsAllowedToGetRender";

export default function ListPage() {

    const {ecoElements, setEcoElements} = useContext(EcoElementContext);
    const {token} = useContext(LoginContext);
    const {filterIsActive} = useContext(FilterContext);

    useEffect(() => {
        getEcoElements(token, setEcoElements);
    }, [token, setEcoElements]);


    return(

        <div>

            <TabBarWithIcons type="list"/>

            <StyledWrapperDiv>
                {!filterIsActive && <FoodStoreList ecoElements={ecoElements}/>}
                {!filterIsActive && <FashionStoreList ecoElements={ecoElements}/>}
                {!filterIsActive && <RestaurantList ecoElements={ecoElements}/>}
                {!filterIsActive && <FairShopList ecoElements={ecoElements}/>}
                {!filterIsActive && <OthersList ecoElements={ecoElements}/>}
                {filterIsActive && <FilterResultList ecoElements={ecoElements}/>}

                {/* the brs are necessary at the moment to keep the full list visible when scrolling */}
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <StyledBottomDiv/>

            </StyledWrapperDiv>

            {ReturnIfUserIsAllowedToGetRender("anyUser") && <AddItemButton bottomDistance="normal"/>}

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
  min-height: 72px;
  z-index: 10;
`


