import React, {useContext, useMemo, useRef, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import styled from "styled-components/macro";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import BlackLine from "../designComponents/otherDesignObjects/BlackLine";
import markerIcon from "../designComponents/mapElements/MarkerIcon";
import EcoElementContext from "../contexts/createContexts/EcoElementContext";
import PageHeaderWithoutWhiteBorder from "../designComponents/otherDesignObjects/PageHeaderWithoutWhiteBorder";
import ShowElementIconButton from "../designComponents/buttons/ShowElementIconButton";
import translationService from "../services/translationService";
import mapCertificates from "./subComponents/mapCertificates";
import GreenBoxSmall from "../designComponents/otherDesignObjects/GreenBoxSmall";
import {useHistory} from "react-router-dom";
import FilterContext from "../contexts/createContexts/FilterContext";
import {updateEcoElement} from "../services/ecoElementService";
import LoginContext from "../contexts/createContexts/LoginContext";


export default function ConfirmLocationPage() {

    const history = useHistory();
    const markerRef = useRef(null);
    const [stageOfThePage, setStageOfThePage] = useState(1);
    const [randomKeyToForceRerender, setRandomKeyToForceReload] = useState(1);
    const {ecoElement, setEcoElement} = useContext(EcoElementContext);
    const {setShowNonReviewedItems} = useContext(FilterContext);
    const {token} = useContext(LoginContext);
    const [position, setPosition] = useState({lng: ecoElement.lat, lat: ecoElement.lon});


    //method to handle the marker dragging process in stage 2 of this page
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }), [],
    )

    //method to handle a yes for the question whether the location is correct
    function handleYes(){
        setShowNonReviewedItems(true);
        history.push("/loading/map");
        setStageOfThePage(1);
    }

    //method to handle a no for the question whether the location is correct
    function handleNo(){
        setStageOfThePage(2);
        setRandomKeyToForceReload(1);
    }

    //method to handle the confirm in stage 2 of the page after the marker dragging
    function handleConfirm(){
        updateEcoElement(ecoElement.name, ecoElement.id, ecoElement.category, ecoElement.categorySub, ecoElement.district,
            ecoElement.address, position.lat, position.lng, token, setEcoElement, ecoElement.certificates);
        history.push("/loading/map");
    }


    return(

        <>
            <PageHeaderWithoutWhiteBorder title="Bestätige die Adresse"/>
            <BlackLine/>
            <ConfirmLocationPageLayout>

                <MapContainer
                    key={randomKeyToForceRerender}
                    center={[ecoElement.lon, ecoElement.lat]}
                    zoom={16}
                    minZoom={1}
                    //topleft, bottomleft, bottomright, topright
                    maxBounds={[[51.65, 6.4], [51.65, 6.4808], [51.3124, 7.8677], [51.6729, 7.8309]]}
                    scrollWheelZoom={"center"}
                    wheelDebounceTime={15}
                    dragging={true}
                    className={"map"}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    { ecoElement.lat && ecoElement.lat && stageOfThePage === 1 &&
                        <Marker key={ecoElement.id} draggable={false} position={[ecoElement.lon, ecoElement.lat]}
                                title={ecoElement.name} icon={markerIcon(ecoElement.category, ecoElement.categorySub)}>
                            <PopupForMarker>
                                <PopupHeader>
                                    {ecoElement.name}
                                    <ShowElementIconButton elementId={ecoElement.id}/>
                                </PopupHeader>
                                {translationService(ecoElement.categorySub)} <br/> {ecoElement.address} <br/>
                                <CertificatesOfItemList>
                                    {mapCertificates(ecoElement, "small")}
                                </CertificatesOfItemList>
                            </PopupForMarker>
                        </Marker>
                    }


                    { stageOfThePage === 2 &&
                        <Marker key={ecoElement.id} draggable={true} eventHandlers={eventHandlers}
                                  position={position} ref={markerRef}
                                  title={ecoElement.name} icon={markerIcon(ecoElement.category, ecoElement.categorySub)}>
                            <PopupForMarker>
                                <PopupHeader>
                                    {ecoElement.name}
                                    <ShowElementIconButton elementId={ecoElement.id}/>
                                </PopupHeader>
                                {translationService(ecoElement.categorySub)} <br/> {ecoElement.address} <br/>
                                <CertificatesOfItemList>
                                    {mapCertificates(ecoElement, "small")}
                                </CertificatesOfItemList>
                            </PopupForMarker>
                        </Marker>
                    }

                </MapContainer>
                <GreenBoxSmall/>

            </ConfirmLocationPageLayout>


            {stageOfThePage === 1 &&
                <MessageDiv>Ist diese Ortsangabe korrekt? <br/>
                    <button onClick={handleYes}>Ja</button>
                    <button onClick={handleNo}>Nein</button>
                </MessageDiv>
            }

            {stageOfThePage === 2 &&
                <MessageDiv>Ziehe den Marker zu der richtigen Position auf der Karte. <br/>
                    <button onClick={handleConfirm}>Bestätigen</button>
                </MessageDiv>
            }

        </>

    );
}



const ConfirmLocationPageLayout = styled.section`
  display: grid;
  width: 100%;
  height: 58%;
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

const MessageDiv = styled.div`
  margin: 20px 20px;
  font-size: 0.9em;
  
  button{
  font-size: 1.0em;
      margin-top: 12px;
      margin-right: 15px;
  }
`

const PopupForMarker = styled(Popup)`
    font-size: 1.15em;
`

const PopupHeader = styled.div`
      font-weight: bold;
      font-size: 1.15em;
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 10px;
      justify-content: left;
      margin-right: 15px;
`

const CertificatesOfItemList = styled.div`
    margin-top: 4px;
`
