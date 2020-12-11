import React, {useContext, useEffect, useState} from "react";
import {
    StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody, StyledElementBodyOneCell
} from "./StyledElementsForTableDesign";
import {useParams, useHistory} from "react-router-dom";
import EcoElementContext from "../contexts/createContexts/EcoElementContext";
import LoginContext from "../contexts/createContexts/LoginContext";
import {getEcoElementById} from "../services/ecoElementService";
import DeleteIconButton from "../designComponents/buttons/DeleteIconButton";
import styled from "styled-components/macro";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import EditIconButton from "../designComponents/buttons/EditIconButton";
import {FaFacebook, FaLink, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import ReviewSection from "./subComponents/ReviewSection";
import RecentlyReviewedItemMessage from "./subComponents/RecentlyReviewedItemMessage";
import translationService from "../services/translationService";
import mapCertificates from "../services/mapCertificates";
import markerIcon from "../designComponents/mapElements/MarkerIcon";
import EmptyDivToClosePage from "../designComponents/otherDesignObjects/EmptyDivToClosePage";
import ReturnIfUserIsAllowedToGetRender from "../services/ReturnIfUserIsAllowedToGetRender";
import InReviewProcessIcon from "../designComponents/icons/ItemIsInReviewProcessIcon";
import ImgUpload from "../services/ImgUpload";

//to fix the "image not found"-bugs that occur when reloading the page
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


export default function EcoElementPage(){

    const history = useHistory();
    const {ecoElement, setEcoElement} = useContext(EcoElementContext);
    const {token} = useContext(LoginContext);
    const [tableColor, setTableColor] = useState("lightgreen");
    const [randomKeyToForceRerender, setRandomKeyToForceReload] = useState(1);
    const [certificateLegendIsOpen, setCertificateLegendIsOpen] = useState(false);

    const {ecoElementIDParam} = useParams();

    useEffect(() => {
        getEcoElementById(ecoElementIDParam, token, setEcoElement);
    }, [ecoElementIDParam, setEcoElement, token]);

    useEffect(() => {

        let randomValue = Math.random();
        setRandomKeyToForceReload(randomValue);

        switch(ecoElement.category){
            case "FAIRSHOP":
                setTableColor("purple");
                break;
            case "FOODSTORE":
                setTableColor("red");
                break;
            case "RESTAURANT":
                setTableColor("orange");
                break;
            case "FASHIONSTORE":
                setTableColor("blue");
                break;
            case "OTHER":
                setTableColor("green");
                break;
            default:
                setTableColor("lightgrey");
        }
    }, [ecoElement]);


    function handleDelete(){
        history.push("/bo/deleteElement/" + ecoElement.id);
    }

    function handleEdit(){
        history.push("/bo/editElement/" + ecoElement.id);
    }

    function hasTitle(){
        return ecoElement.title !== "";
    }

    function handleShowCertificateLegend(){
        setCertificateLegendIsOpen(!certificateLegendIsOpen);
    }

    return (

        ecoElement &&

        <>
            <ScrollDiv>

                <StyledWrapperTable>
                    <StyledHeaderRow className={tableColor}>
                        {ecoElement.name}
                        {!ecoElement.isReviewed && <InReviewProcessIcon/>}
                    </StyledHeaderRow>
                            <StyledElement>
                                <div/>

                                {/*Subkategorie*/}
                                <StyledElementHeader>
                                    <StyledNameCell>
                                        {translationService(ecoElement.categorySub)}
                                        {hasTitle() && <><br/><sup>{ecoElement.title}</sup></>}
                                    </StyledNameCell>
                                    <StyledCell>
                                        <div/>
                                    </StyledCell>
                                    <StyledIconDiv>
                                        {ReturnIfUserIsAllowedToGetRender(ecoElement.creator) &&
                                        <>
                                            <EditIconButton handle={handleEdit}/>
                                            <DeleteIconButton size="small" handle={handleDelete}/>
                                        </>
                                        }
                                    </StyledIconDiv>
                                </StyledElementHeader>

                                {/*Adresse*/}
                                <StyledElementBodyOneCell>
                                    <StyledCell>
                                        {ecoElement.address}
                                    </StyledCell>
                                </StyledElementBodyOneCell>

                                {/*Stadtteil + Stadt*/}
                                <StyledElementBodyOneCell>
                                    <StyledCell>
                                        {ecoElement.district?
                                            ecoElement.district + ", Bochum"
                                            : "Bochum"}
                                    </StyledCell>
                                </StyledElementBodyOneCell>

                                {/*Öffnungszeiten*/}
                                <StyledElementBody>
                                    <StyledCell>
                                        Öffnungszeiten:
                                    </StyledCell>
                                    <StyledCell>
                                        Mo-Sa 11-14 Uhr<br/>
                                        So 12-13 Uhr
                                    </StyledCell>
                                </StyledElementBody>

                                {/*Telefonnummer*/}
                                <StyledElementBody>
                                    <StyledCell>
                                        Telefonnummer:
                                    </StyledCell>
                                    <StyledCell>
                                        0123456789
                                    </StyledCell>
                                </StyledElementBody>

                                {/*Website/Facebook*/}
                                <StyledElementBody>
                                    <StyledCell>
                                        Links:
                                    </StyledCell>
                                    <StyledCell>
                                        <StyledIcons>
                                            {/*Todo: urls unbedingt ändern*/}
                                            <a href="http://www.spiegel.de"> <FaLink/> </a>
                                            <a href="http://www.facebook.de"> <FaFacebook/> </a>
                                        </StyledIcons>
                                    </StyledCell>
                                </StyledElementBody>

                                {/*empty line*/}
                                <StyledElementBody>
                                    <StyledCell>
                                    </StyledCell>
                                    <StyledCell>
                                    </StyledCell>
                                </StyledElementBody>

                                {/*Zertifikate*/}
                                <StyledElementBody>
                                    <StyledCell>
                                        {"Zertifikate: "}
                                        {certificateLegendIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em", marginBottom: "-1px"}}
                                                                                          onClick={handleShowCertificateLegend}/>
                                            : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}}
                                                                       onClick={handleShowCertificateLegend}/>}
                                    </StyledCell>
                                    <StyledCell>
                                        {certificateLegendIsOpen ?
                                            <StyledLegendDiv> <div className="heading">Legende:</div> {mapCertificates(ecoElement, "withText")} </StyledLegendDiv> :
                                            mapCertificates(ecoElement, "large")}
                                    </StyledCell>
                                </StyledElementBody>
                            <div/>
                        </StyledElement>
                </StyledWrapperTable>

                <ReviewSection/>

                <RecentlyReviewedItemMessage/>

                <StyledDiv>

                    <div>
                        {ecoElement.pictureUrl? <StyledElementPhoto src={ecoElement.pictureUrl}/>
                            : <StyledElementPhoto src="/profilePics/placeholder.webp"/>
                        }
                        {ReturnIfUserIsAllowedToGetRender(ecoElement.creator) &&
                        <ImgUpload type="elementImmediate" dark="true" ecoElementId={ecoElement.id}/>}
                    </div>

                    <StyledDivForMap>

                        {ecoElement.lat && ecoElement.lon &&
                        <MapContainer
                            key={randomKeyToForceRerender}
                            center={[ecoElement.lon, ecoElement.lat]}
                            zoom={16}
                            minZoom={12}
                            //topleft, bottomleft, bottomright, topright
                            maxBounds={[[51.65, 6.4], [51.65, 6.4808], [51.3124, 7.8677], [51.6729, 7.8309]]}
                            scrollWheelZoom={"center"}
                            wheelDebounceTime={15}
                            dragging={false}
                            className={"map"}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            { ecoElement.lat && ecoElement.lon &&

                            <Marker key={ecoElement.id} position={[ecoElement.lon, ecoElement.lat]}
                                            title={ecoElement.name} icon={markerIcon(ecoElement.category, ecoElement.categorySub)}>
                            </Marker>}

                        </MapContainer>
                        }
                    </StyledDivForMap>

                    <StyledDivForElementData>

                        <strong>Erstellt von:</strong>
                        <div>{ecoElement.creator}</div>
                        <br/>

                        <strong>Angelegt am:</strong>
                        <div>{ecoElement.dateCreatedExternal}</div>
                        <br/>

                        <strong>Zuletzt geändert:</strong>
                        <div>{ecoElement.dateLastUpdatedExternal}</div>
                        <br/>

                    </StyledDivForElementData>

                </StyledDiv>
                <EmptyDivToClosePage/>

            </ScrollDiv>


    </>


    )
}

const StyledDiv = styled.div`
  margin: 25px;
  height: auto;
  width: auto;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 25px;
`

const StyledElementPhoto = styled.img`
  display: block;
  width: 100%;
  border: var(--darkgrey) solid 1.5px;
`

const StyledDivForMap = styled.div`
  grid-row: span 2;
  height: 98%;
  width: 99%;
  .map {
    height: 100%;
    width: 100%;
    border: var(--darkgrey) solid 1.5px;
  }
`

const StyledDivForElementData = styled.div`
  display: grid;
  grid-template-rows: min-content min-content min-content min-content min-content min-content min-content min-content;
  width: 100%;
  grid-gap: 3px;
  font-size: 0.75em;
  line-height: 1.0em;
`

const StyledIcons = styled.div`
  font-size: 1.35em;
  color: var(--darkgrey);
  a {
    color: var(--darkgrey);
    
    :hover{
        color: var(--darkgrey);
    }
    :active {
      color: var(--darkgrey);
    }
  }
`

const StyledLegendDiv = styled.div`
  margin-top: 5px;
  font-size: 0.9em;
  
  .heading {
      margin-bottom: 5px;
      font-size: 1.1em;
      font-weight: bold;
  }
`

const ScrollDiv = styled.div`
  overflow: scroll;
  height: 100%;
`