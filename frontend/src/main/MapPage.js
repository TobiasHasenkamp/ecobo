import PageHeader from "./PageHeader";
import React, {useContext, useEffect} from "react";
import GreenBoxWithGradientBorderlineUntilSiteEnds from "./designElements/GreenBoxWithGradientBorderlineUntilSiteEnds";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import EcoElementContext from "./contexts/EcoElementContext";
import {getEcoElements} from "./controller/EcoElementController";
import AddItemButton from "./designElements/buttons/AddItemButton";
import TabBarWithOneLink from "./designElements/TabBarWithOneLink";
import styled from "styled-components/macro";
import LoginTokenContext from "./contexts/LoginTokenContext";
import 'leaflet/dist/leaflet.css';

export default function MapPage() {

    const {token} = useContext(LoginTokenContext);
    const {ecoElements, setEcoElements} = useContext(EcoElementContext);

    useEffect(() => {
        getEcoElements(token, setEcoElements);
    }, [token]);

    useEffect(() => {



        //Add the leaflet javascript file to the pages head
        const leafletJSFile = document.createElement("script");
        document.head.append(leafletJSFile);
        leafletJSFile.setAttribute("src", "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js");
        leafletJSFile.setAttribute("integrity",
            "sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==");
        leafletJSFile.setAttribute("crossorigin", "");

        //the crossOrigin doesn't work as intended the way it is implemented right now. it should render to 'crossorigin=""' but renders to 'crossorigin' inside
        //both the leafletJSFile and the leafletCSSStyleSheet in the head of the page. This seems to cause no problems right now, but maybe later?

    }, []);


    return(

        <>
            <PageHeader title="EcoMap"/>

            <TabBarWithOneLink text="Show as List" link="/bo/list"/>

            <StyledContentDiv>

                    <MapContainer
                                  center={[51.4841, 7.2200]}
                                  zoom={13}
                                  minZoom={10}
                                  //topleft, bottomleft, bottomright, topright
                                  maxBounds={[[51.65, 6.4], [51.65, 6.4808], [51.3124, 7.8677], [51.6729, 7.8309]]}
                                  scrollWheelZoom={true}
                                  wheelDebounceTime={15}
                                  style={{height: "100%"}}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {

                            ecoElements?.map((element) => (

                                    <Marker key={element.id} position={[element.lon, element.lat]}
                                            title={element.name}>
                                        <Popup>
                                            {element.name} <br/> {element.category} / {element.categorySub} / {element.address}
                                        </Popup>
                                    </Marker>
                            ))
                        }



                    </MapContainer>

                <GreenBoxWithGradientBorderlineUntilSiteEnds/>



            </StyledContentDiv>

            <AddItemButton/>
        </>

    );
}



const StyledContentDiv = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr auto;
  grid-gap: 0;
`