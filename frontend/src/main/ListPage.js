import PageHeader from "./PageHeader";
import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom"
import EcoElementContext from "./contexts/EcoElementContext";
import {getEcoElements} from "./controller/EcoElementController";
import FoodStoreList from "./list-route/FoodStoreList";
import RestaurantList from "./list-route/RestaurantList";
import FairShopList from "./list-route/FairShopList";
import getLonAndLatForAddress from "./controller/MapMarkerController";

export default function ListPage() {

    const history = useHistory();
    const {ecoElements, setEcoElements} = useContext(EcoElementContext);
    const [lonLatOfRequest, setLonLatOfRequest] = useState({});
    let finalLat;
    let finalLon;

    useEffect(() => {
        getEcoElements().then(setEcoElements);
    }, [setEcoElements]);

    useEffect(() => {

        let p = lonLatOfRequest[0];

        for (let key in p) {
            if (p.hasOwnProperty(key) && key === "lat") {
                finalLat = p[key];
            } else if (p.hasOwnProperty(key) && key === "lon") {
                finalLon = p[key];
            }
        }

        if (finalLon !== undefined) {
            console.log(finalLon, finalLat)
        }

    }, [lonLatOfRequest]);


    function handleEditElement() {

        getLonAndLatForAddress("Bochum, Verkehrsstr. 49", lonLatOfRequest, setLonLatOfRequest)

        //history.push("/404");
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
                <div>

                </div>
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

