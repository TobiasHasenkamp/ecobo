import PageHeader from "./PageHeader";
import React, {useContext, useEffect, useState} from "react";
import GreenBoxWithGradientBorderlineUntilSiteEnds from "./designElements/GreenBoxWithGradientBorderlineUntilSiteEnds";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import EcoElementContext from "./contexts/EcoElementContext";
import {getEcoElements} from "./services/EcoElementService";
import AddItemButton from "./designElements/buttons/AddItemButton";
import styled from "styled-components/macro";
import LoginTokenContext from "./contexts/LoginTokenContext";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import TabBarWithIcons from "./designElements/TabBarWithIcons";
import BlackLineMedium from "./designElements/BlackLineMedium";
import {useLocation} from "react-router-dom";


//to fix the "image not found"-bugs that occur when reloading the page
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;



export default function MapPage() {

    const {token} = useContext(LoginTokenContext);
    const {ecoElements, setEcoElements, ecoElement} = useContext(EcoElementContext);
    const [randomKeyToForceRerender, setRandomKeyToForceReload] = useState(1);
    const [coordinatesToCenterMapLon, setCoordinatesToCenterMapLon] = useState(51.4841);
    const [coordinatesToCenterMapLat, setCoordinatesToCenterMapLat] = useState(7.2200);
    const [zoomValue, setZoomValue] = useState(13);
    const location = useLocation();

    useEffect(() => {

        if (location.pathname === "/bo/map/centered" && ecoElement.lon && ecoElement.lat){
            setCoordinatesToCenterMapLon(ecoElement.lon);
            setCoordinatesToCenterMapLat(ecoElement.lat);
            setZoomValue(16);
        }
        else {
            setCoordinatesToCenterMapLon(51.4841);
            setCoordinatesToCenterMapLat(7.2200);
            setZoomValue(13);
        }

        let randomValue = Math.random();
        setRandomKeyToForceReload(randomValue);
        getEcoElements(token, setEcoElements);
    }, [token, setEcoElements, ecoElement.lat, ecoElement.lon, location.pathname,
        coordinatesToCenterMapLat, coordinatesToCenterMapLon, zoomValue]);


    return(

        <>
            <PageHeader title="EcoMap"/>


            <TabBarWithIcons type="map"/>
            <BlackLineMedium/>

            <StyledContentDiv>

                {ecoElements &&
                <MapContainer
                    key={randomKeyToForceRerender}
                    center={[coordinatesToCenterMapLon, coordinatesToCenterMapLat]}
                    zoom={zoomValue}
                    minZoom={10}
                    //topleft, bottomleft, bottomright, topright
                    maxBounds={[[51.65, 6.4], [51.65, 6.4808], [51.3124, 7.8677], [51.6729, 7.8309]]}
                    scrollWheelZoom={true}
                    wheelDebounceTime={15}
                    className={"map"}
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
                }

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
  grid-gap: 3px;
  
   .map {
    margin-left: -1px;
    margin-right: -1px;
    height: 100%;
    width: 100%;
    border: var(--darkgrey) solid 1.5px;
  }
  
`