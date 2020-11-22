import PageHeader from "./PageHeader";
import React, {useEffect, useContext} from "react";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom"
import EcoElementContext from "./contexts/EcoElementContext";
import {getEcoElements} from "./controller/EcoElementController";
import FoodStoreList from "./list-route/FoodStoreList";
import RestaurantList from "./list-route/RestaurantList";
import FairShopList from "./list-route/FairShopList";
import AddItemButton from "./designElements/buttons/AddItemButton";
import TabBarWithOneLink from "./designElements/TabBarWithOneLink";
import LoginTokenContext from "./contexts/LoginTokenContext";

export default function ListPage() {

    const history = useHistory();
    const {ecoElements, setEcoElements} = useContext(EcoElementContext);
    const {token} = useContext(LoginTokenContext);

    useEffect(() => {
        getEcoElements(token, setEcoElements);
    }, [token, setEcoElements]);


    function handleEditElement() {
        history.push("/404");
    }

    return(

        <div>

            <PageHeader title="EcoMap"/>
            <TabBarWithOneLink text="Show as Map" link="/bo/map"/>

            <StyledWrapperDiv>
                <FoodStoreList ecoElements={ecoElements} handleEditElement={handleEditElement}/>
                <RestaurantList ecoElements={ecoElements} handleEditElement={handleEditElement}/>
                <FairShopList ecoElements={ecoElements} handleEditElement={handleEditElement}/>

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


