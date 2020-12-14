import React, {useContext, useEffect, useState} from "react";
import {
    StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody, StyledElementBodyOneCell
} from "../designComponents/tableDesign/StyledElementsForTableDesign";
import {useParams, useHistory} from "react-router-dom";
import EcoElementContext from "../contexts/createContexts/EcoElementContext";
import LoginContext from "../contexts/createContexts/LoginContext";
import {getEcoElementById} from "../services/ecoElementService";
import DeleteIconButton from "../designComponents/buttons/DeleteIconButton";
import styled from "styled-components/macro";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import EditIconButton from "../designComponents/buttons/EditIconButton";
import {FaFacebook, FaLink, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import ReviewSection from "./subComponents/ReviewSection";
import RecentlyReviewedItemMessage from "./subComponents/RecentlyReviewedItemMessage";
import translationService from "../services/translationService";
import mapCertificates from "./subComponents/mapCertificates";
import EmptyDivToClosePage from "../designComponents/otherDesignObjects/EmptyDivToClosePage";
import ReturnIfUserIsAllowedToGetRender from "../services/ReturnIfUserIsAllowedToGetRender";
import InReviewProcessIcon from "../designComponents/icons/ItemIsInReviewProcessIcon";
import ImgUploadComponent from "../services/ImgUploadComponent";
import SmallMap from "./subComponents/SmallMap";


export default function EcoElementPage(){

    const history = useHistory();
    const [tableColor, setTableColor] = useState("lightgreen");
    const [randomKeyToForceRerender, setRandomKeyToForceReload] = useState(1);
    const [certificateLegendIsOpen, setCertificateLegendIsOpen] = useState(false);
    const {ecoElement, setEcoElement} = useContext(EcoElementContext);
    const {token} = useContext(LoginContext);
    const {ecoElementIDParam} = useParams();

    //useEffect to load the EcoElement data at page load
    useEffect(() => {
        getEcoElementById(ecoElementIDParam, token, setEcoElement);
    }, [ecoElementIDParam, setEcoElement, token]);

    //useEffect set the TableColor in dependency of the category once the EcoElement data has loaded
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

    function handleShowCertificateLegend(){
        setCertificateLegendIsOpen(!certificateLegendIsOpen);
    }

    //tests if the EcoElement has a title to render the header differently but the idea to implement titles
    // is probably obsolete right now, should probably be deleted soon
    function hasTitle(){
        return ecoElement.title !== "";
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

                                {/*Subcategory*/}
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

                                {/*Address*/}
                                <StyledElementBodyOneCell>
                                    <StyledCell>
                                        {ecoElement.address}
                                    </StyledCell>
                                </StyledElementBodyOneCell>

                                {/*District + City*/}
                                <StyledElementBodyOneCell>
                                    <StyledCell>
                                        {ecoElement.district?
                                            ecoElement.district + ", Bochum"
                                            : "Bochum"}
                                    </StyledCell>
                                </StyledElementBodyOneCell>

                                {/*Opening times / still hardcoded at the moment*/}
                                <StyledElementBody>
                                    <StyledCell>
                                        Öffnungszeiten:
                                    </StyledCell>
                                    <StyledCell>
                                        Mo-Sa 11-14 Uhr<br/>
                                        So 12-13 Uhr
                                    </StyledCell>
                                </StyledElementBody>

                                {/*Telefonnummer  / still hardcoded at the moment*/}
                                <StyledElementBody>
                                    <StyledCell>
                                        Telefonnummer:
                                    </StyledCell>
                                    <StyledCell>
                                        0123456789
                                    </StyledCell>
                                </StyledElementBody>

                                {/*Website/Facebook / still hardcoded at the moment*/}
                                <StyledElementBody>
                                    <StyledCell>
                                        Links:
                                    </StyledCell>
                                    <StyledCell>
                                        <WebsiteIcons>
                                            {/*Todo: urls ändern*/}
                                            <a href="http://www.spiegel.de"> <FaLink/> </a>
                                            <a href="http://www.facebook.de"> <FaFacebook/> </a>
                                        </WebsiteIcons>
                                    </StyledCell>
                                </StyledElementBody>

                                {/*empty row*/}
                                <StyledElementBodyOneCell>
                                    <StyledCell/>
                                </StyledElementBodyOneCell>

                                {/*certificates*/}
                                <StyledElementBody>
                                    <StyledCell>
                                        {"Zertifikate: "}
                                        {certificateLegendIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em",
                                                                                                    marginBottom: "-1px"}}
                                                                                          onClick={handleShowCertificateLegend}/>
                                            : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}}
                                                                       onClick={handleShowCertificateLegend}/>}
                                    </StyledCell>
                                    <StyledCell>
                                        {certificateLegendIsOpen ?
                                            <CertificateLegend> <div className="heading">Legende:</div>
                                                {mapCertificates(ecoElement, "withText")} </CertificateLegend>
                                            : mapCertificates(ecoElement, "large")}
                                    </StyledCell>
                                </StyledElementBody>
                            <div/>
                        </StyledElement>
                </StyledWrapperTable>

                {/*Review section (if not-reviewed)*/}
                <ReviewSection/>

                {/*Recently reviewed message (it recently reviewed)*/}
                <RecentlyReviewedItemMessage/>

                <BottomSection>

                    {/*Small Picture*/}
                    <section>
                        {ecoElement.pictureUrl? <EcoElementPhoto src={ecoElement.pictureUrl}/>
                            : <EcoElementPhoto src="/profilePics/placeholder.webp"/>
                        }
                        {ReturnIfUserIsAllowedToGetRender(ecoElement.creator) &&
                        <ImgUploadComponent type="elementImmediate" dark="true" ecoElementId={ecoElement.id}/>}
                    </section>

                    {/*Small map*/}
                    <SmallMap ecoElement={ecoElement} randomKeyToForceRerender={randomKeyToForceRerender}/>

                    {/*EcoElement internal Data*/}
                    <InternalDataSection>
                        <strong>Erstellt von:</strong>
                        <div>{ecoElement.creator}</div>
                        <br/>
                        <strong>Angelegt am:</strong>
                        <div>{ecoElement.dateCreatedExternal}</div>
                        <br/>
                        <strong>Zuletzt geändert:</strong>
                        <div>{ecoElement.dateLastUpdatedExternal}</div>
                        <br/>
                    </InternalDataSection>

                </BottomSection>
                <EmptyDivToClosePage type="medium"/>

            </ScrollDiv>
    </>
    )
}

const BottomSection = styled.section`
  margin: 25px;
  height: auto;
  width: auto;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 25px;
`

const EcoElementPhoto = styled.img`
  display: block;
  width: 100%;
  border: var(--neutral-color-darkgrey) solid 1.5px;
`

const InternalDataSection = styled.section`
  display: grid;
  grid-template-rows: min-content min-content min-content min-content min-content min-content min-content min-content;
  width: 100%;
  grid-gap: 3px;
  font-size: 0.75em;
  line-height: 1.0em;
`

const WebsiteIcons = styled.div`
  font-size: 1.35em;
  color: var(--neutral-color-darkgrey);
  a {
    color: var(--neutral-color-darkgrey);
    
    :hover{
        color: var(--neutral-color-darkgrey);
    }
    :active {
      color: var(--neutral-color-darkgrey);
    }
  }
`

const CertificateLegend = styled.div`
  margin-top: 5px;
  font-size: 0.9em;
  
  .heading {
      margin-bottom: 5px;
      font-size: 1.1em;
      font-weight: bold;
  }
`

const ScrollDiv = styled.section`
  overflow: scroll;
  height: 100%;
`