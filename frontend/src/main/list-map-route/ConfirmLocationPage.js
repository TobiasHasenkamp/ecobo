import React, {useContext, useMemo, useRef, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import styled from "styled-components/macro";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import BlackLine from "../designComponents/otherDesignObjects/BlackLine";
import returnMarkerIcon from "../services/returnMarkerIcon";
import EcoElementContext from "../contexts/createContexts/EcoElementContext";
import PageHeaderWithoutWhiteBorder from "../PageHeaderWithoutWhiteBorder";
import ShowElementIconButton from "../designComponents/buttons/ShowElementIconButton";
import translationService from "../services/translationService";
import mapCertificates from "../services/mapCertificates";
import GreenBoxSmall from "../designComponents/otherDesignObjects/GreenBoxSmall";
import {useHistory} from "react-router-dom";
import FilterContext from "../contexts/createContexts/FilterContext";
import {updateEcoElement} from "../services/ecoElementService";
import LoginContext from "../contexts/createContexts/LoginContext";


//to fix the "image not found"-bugs that occur when reloading the page
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;




export default function ConfirmLocationPage() {

    const {ecoElement, setEcoElement} = useContext(EcoElementContext);
    const [randomKeyToForceRerender, setRandomKeyToForceReload] = useState(1);
    const {setShowNonReviewedItems} = useContext(FilterContext);
    const history = useHistory();
    const [stageOfThePage, setStageOfThePage] = useState(1);
    const {token} = useContext(LoginContext);
    const [position, setPosition] = useState({lng: ecoElement.lat, lat: ecoElement.lon});
    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )

    function handleYes(){
        setShowNonReviewedItems(true);
        history.push("/loading/map");
        setStageOfThePage(1);
    }

    function handleNo(){
        setStageOfThePage(2);
        setRandomKeyToForceReload(1);
    }

    function handleConfirm(){
        updateEcoElement(ecoElement.name, ecoElement.id, ecoElement.category, ecoElement.categorySub, ecoElement.district,
            ecoElement.address, position.lat, position.lng, token, setEcoElement,
            ecoElement.certificates);
        history.push("/loading/map");
    }


    return(

        <>
            <PageHeaderWithoutWhiteBorder title="Bestätige die Adresse"/>
            <BlackLine/>

            <StyledContentDiv>

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
                            title={ecoElement.name} icon={returnMarkerIcon(ecoElement.category, ecoElement.categorySub)}>

                        <StyledPopup>
                            <StyledPopupHeader>
                                {ecoElement.name}
                                <ShowElementIconButton elementId={ecoElement.id}/>
                            </StyledPopupHeader>
                            {translationService(ecoElement.categorySub)} <br/> {ecoElement.address} <br/>
                            <StyledMappedCertificates>
                                {mapCertificates(ecoElement, "small")}
                            </StyledMappedCertificates>
                        </StyledPopup>
                    </Marker>}

                    { stageOfThePage === 2 &&
                    <Marker key={ecoElement.id} draggable={true} eventHandlers={eventHandlers}
                              position={position} ref={markerRef}
                              title={ecoElement.name} icon={returnMarkerIcon(ecoElement.category, ecoElement.categorySub)}>

                        <StyledPopup>
                            <StyledPopupHeader>
                                {ecoElement.name}
                                <ShowElementIconButton elementId={ecoElement.id}/>
                            </StyledPopupHeader>
                            {translationService(ecoElement.categorySub)} <br/> {ecoElement.address} <br/>
                            <StyledMappedCertificates>
                                {mapCertificates(ecoElement, "small")}
                            </StyledMappedCertificates>
                        </StyledPopup>
                    </Marker>}

                </MapContainer>

                <GreenBoxSmall/>

            </StyledContentDiv>

            {stageOfThePage === 1 &&

                <StyledTextDiv>Ist diese Ortsangabe korrekt? <br/>

                    <button onClick={handleYes}>Ja</button>
                    <button onClick={handleNo}>Nein</button>

                </StyledTextDiv>
            }

            {stageOfThePage === 2 &&

            <StyledTextDiv>Ziehe den Marker zu der richtigen Position auf der Karte. <br/>

                <button onClick={handleConfirm}>Bestätigen</button>

            </StyledTextDiv>
            }

        </>

    );
}



const StyledContentDiv = styled.div`
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

const StyledTextDiv = styled.div`
  margin: 20px 20px;
  font-size: 0.9em;
  
  button{
  font-size: 1.0em;
      margin-top: 12px;
      margin-right: 15px;
  }
`

const StyledPopup = styled(Popup)`
    font-size: 1.15em;
`

const StyledPopupHeader = styled.div`
      font-weight: bold;
      font-size: 1.15em;
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 10px;
      justify-content: left;
      margin-right: 15px;
`

const StyledMappedCertificates = styled.div`
    margin-top: 4px;
`
