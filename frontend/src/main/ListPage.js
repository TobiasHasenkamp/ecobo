import PageHeader from "./PageHeader";
import React, {useEffect, useContext} from "react";
import styled from "styled-components/macro";
import EcoElementContext from "./contexts/EcoElementContext";
import {getEcoElements} from "./services/ecoElementService";
import FoodStoreList from "./list-route/FoodStoreList";
import RestaurantList from "./list-route/RestaurantList";
import FairShopList from "./list-route/FairShopList";
import AddItemButton from "./designElements/buttons/AddItemButton";
import LoginTokenContext from "./contexts/LoginTokenContext";
import TabBarWithIcons from "./designElements/TabBarWithIcons";

export default function ListPage() {

    const {ecoElements, setEcoElements} = useContext(EcoElementContext);
    const {token} = useContext(LoginTokenContext);

    useEffect(() => {
        getEcoElements(token, setEcoElements);
    }, [token, setEcoElements]);


    return(

        <div>

            <PageHeader title="EcoMap"/>
            <TabBarWithIcons type="list"/>

            <StyledWrapperDiv>
                <FoodStoreList ecoElements={ecoElements}/>
                <RestaurantList ecoElements={ecoElements}/>
                <FairShopList ecoElements={ecoElements}/>

                {/* the brs are necessary at the moment to keep the full list visible when scrolling */}
                <br/>
                <AddItemButton/>
                <br/>
                <br/>
                <br/>
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


