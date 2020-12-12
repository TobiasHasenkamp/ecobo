import React, {useContext, useEffect, useState} from "react";
import GreenBoxUntilSiteEnds from "./designComponents/otherDesignObjects/GreenBoxUntilSiteEnds";
import {LayersControl, MapContainer, TileLayer} from "react-leaflet";
import EcoElementContext from "./contexts/createContexts/EcoElementContext";
import {getEcoElements} from "./services/ecoElementService";
import AddItemButton from "./designComponents/buttons/AddItemButton";
import styled from "styled-components/macro";
import LoginContext from "./contexts/createContexts/LoginContext";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import FilterAndSwitchViewBar from "./list-map-route/FilterAndSwitchViewBar";
import BlackLine from "./designComponents/otherDesignObjects/BlackLine";
import {useLocation} from "react-router-dom";
import MapMarkersForMap from "./designComponents/mapElements/MapMarkersForMap";
import ReturnIfUserIsAllowedToGetRender from "./services/ReturnIfUserIsAllowedToGetRender";


export default function MapPage() {

    const [randomKeyToForceRerender, setRandomKeyToForceReload] = useState(1);
    const [coordinatesToCenterMapLon, setCoordinatesToCenterMapLon] = useState(51.4841);
    const [coordinatesToCenterMapLat, setCoordinatesToCenterMapLat] = useState(7.2200);
    const [zoomValue, setZoomValue] = useState(13);
    const location = useLocation();
    const {token} = useContext(LoginContext);
    const {ecoElements, setEcoElements, ecoElement} = useContext(EcoElementContext);

    //useEffect to load EcoElement and center the map at page load (either on an ecoElement when on
    // path "/centered" or otherwise with standard values)
    useEffect(() => {
        if (location.pathname === "/bo/map/centered" && ecoElement.lon && ecoElement.lat){
            setCoordinatesToCenterMapLon(ecoElement.lon);
            setCoordinatesToCenterMapLat(ecoElement.lat);
            setZoomValue(16);
        } else {
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
            <FilterAndSwitchViewBar type="map"/>
            <BlackLine/>
            <MapSection>
                {ecoElements &&
                    <MapContainer
                        key={randomKeyToForceRerender}
                        center={[coordinatesToCenterMapLon, coordinatesToCenterMapLat]}
                        zoom={zoomValue}
                        minZoom={10}
                        //topleft, bottomleft, bottomright, topright
                        maxBounds={[[51.65, 6.4], [51.65, 6.4808], [51.3124, 7.8677], [51.6729, 7.8309]]}
                        scrollWheelZoom={true}
                        doubleClickZoom={false}
                        wheelDebounceTime={15}
                        className={"map"}
                    >
                        <LayersControl position="topright" collapsed={true}>
                                <LayersControl.BaseLayer checked={true} name="OpenStreetMap.Org">
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="OpenStreetMap.de">
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
                                />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="OpenStreetMap.ÖPNV-Karte">
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png"
                                    />
                                </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="OpenStreetMap. Humanitarian style">
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>

                        </LayersControl>

                        {MapMarkersForMap(ecoElements)}

                    </MapContainer>
                }
                <GreenBoxUntilSiteEnds/>
            </MapSection>
            {ReturnIfUserIsAllowedToGetRender("anyUser") && <AddItemButton bottomDistance="large"/>}
        </>

    );
}


const MapSection = styled.section`
  display: grid;
  width: 100%;
  height: 97%;
  grid-template-rows: 1fr auto;
  grid-gap: 3px;
  
   .map {
    margin-left: -1px;
    margin-right: -1px;
    height: 100%;
    width: 100%;
    border: var(--neutral-color-darkgrey) solid 1.5px;
  }
  
`