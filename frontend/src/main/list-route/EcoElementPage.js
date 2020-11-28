import React, {useContext, useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "./StyledElementsForTableDesign";
import {useParams, useHistory} from "react-router-dom";
import EcoElementContext from "../contexts/EcoElementContext";
import LoginTokenContext from "../contexts/LoginTokenContext";
import {addReviewToEcoElement, getEcoElementById} from "../services/EcoElementService";
import DeleteIconButtonSmall from "../designElements/buttons/DeleteIconButtonSmall";
import styled from "styled-components/macro";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import EditIconButtonMedium from "../designElements/buttons/EditIconButtonMedium";
import {FaFacebook, FaLink, FaCheck, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp, FaTimes} from "react-icons/fa";

//to fix the "image not found"-bugs that occur when reloading the page
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


export default function EcoElementPage(){

    const history = useHistory();
    const {ecoElement, setEcoElement} = useContext(EcoElementContext);
    const {token, username} = useContext(LoginTokenContext);
    const [tableColor, setTableColor] = useState("lightgreen");
    const [randomKeyToForceRerender, setRandomKeyToForceReload] = useState(1);
    const [commentSectionIsOpen, setCommentSectionIsOpen] = useState(false);
    const [addReviewSectionIsOpen, setAddReviewSectionIsOpen] = useState(false);
    const [reviewComment, setReviewComment] = useState("");

    const {ecoElementIDParam} = useParams();

    useEffect(() => {
        getEcoElementById(ecoElementIDParam, token, setEcoElement);
    }, [ecoElementIDParam, setEcoElement, token]);

    useEffect(() => {

        setCommentSectionIsOpen(false);
        setAddReviewSectionIsOpen(false);
        let randomValue = Math.random();
        setRandomKeyToForceReload(randomValue);

        switch(ecoElement.category){
            case "FAIRSHOP":
                setTableColor("yellow");
                break;
            case "FOODSTORE":
                setTableColor("red");
                break;
            case "RESTAURANT":
                setTableColor("blue");
                break;
            default:
                setTableColor("lightgreen");
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

    function handleShowAddReviewSection(){
        setAddReviewSectionIsOpen(!addReviewSectionIsOpen);
    }

    function handleShowCommentsSection(){
        if (ecoElement.reviews.filter((review) => (review.reviewComment !== "")).length > 0){
            setCommentSectionIsOpen(!commentSectionIsOpen);
        }
    }

    function handleAddReview(event){
        //function seems to have problems, cause not every time the event is transported, maybe this is only a problem in the browser?
        if (event.target.getAttribute("name") === "positiveAddReviewButton"){
            addReviewToEcoElement(ecoElement.id, true, reviewComment, token, setEcoElement);
            setAddReviewSectionIsOpen(false);
        }
        else if (event.target.getAttribute("name") === "negativeAddReviewButton"){
            addReviewToEcoElement(ecoElement.id, false, reviewComment, token, setEcoElement);
            setAddReviewSectionIsOpen(false);
        }
    }

    function handleAddReviewCommentChange(event){
        setReviewComment(event.target.value);
    }

    function returnPercentageOfPositiveReviews(element) {

        if (element.reviews.length > 0 && element.reviews.length !== undefined) {
            const positivePercentage = Math.round(100 / element.reviews.length * element.reviews.filter(
                (review) => (review.positive)).length);

            if (positivePercentage === undefined || positivePercentage === Infinity || positivePercentage < 0){
                return " (0% positiv)";
            }

            return " (" + positivePercentage + "% positiv)";
        }
        else {
            return "-";
        }
    }

    function returnHeadlineForAddingAReview(element){

        if (element.reviews.filter((review) => (review.author === username)).length !== 0){
            return "Dein bestehendes Review überschreiben "
        }
        else {
            return "Eigenes Review hinzufügen ";
        }
    }


    return (

        ecoElement &&

        <>
            <StyledWrapperTable>
                <StyledHeaderRow className={tableColor}>
                    {ecoElement.name}
                </StyledHeaderRow>
                        <StyledElement>
                            <div/>

                            {/*Subkategorie*/}
                            <StyledElementHeader>
                                <StyledNameCell>
                                    {ecoElement.categorySub}
                                    {hasTitle() && <><br/><sup>{ecoElement.title}</sup></>}
                                </StyledNameCell>
                                <StyledCell>
                                    <div/>
                                </StyledCell>
                                <StyledIconDiv>
                                    <EditIconButtonMedium handle={handleEdit}/>
                                    <DeleteIconButtonSmall handle={handleDelete}/>
                                </StyledIconDiv>
                            </StyledElementHeader>

                            {/*Adresse*/}
                            <StyledElementBody>
                                <StyledCell>
                                    {ecoElement.address}
                                </StyledCell>
                                <StyledCell>
                                </StyledCell>
                            </StyledElementBody>

                            {/*Stadtteil + Stadt*/}
                            <StyledElementBody>
                                <StyledCell>
                                    Weitmar, Bochum
                                </StyledCell>
                                <StyledCell>
                                </StyledCell>
                            </StyledElementBody>

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
                                    Zertifikate:
                                </StyledCell>
                                <StyledCell>
                                    Zertifikate ....
                                    <br/> Zertifikate ....
                                </StyledCell>
                            </StyledElementBody>
                        <div/>
                    </StyledElement>
            </StyledWrapperTable>

            {/*Review section*/}
            {(ecoElement.isReviewed === false) &&
                <StyledWrapperTable>
                    <StyledHeaderRow className="lightgrey">
                        Review-Status
                    </StyledHeaderRow>

                    {/*review message if item was reset*/}
                    {(ecoElement.adminNote === "Review has been reseted because of an element edit." &&
                    ecoElement.reviews.length < 2) &&
                    <StyledElementBody>
                        <StyledCell style={{ gridColumn: "1 / span 2" }}>
                            Dieses Element wurde am {ecoElement.dateLastUpdatedExternal} substantiell geändert. Deshalb wurde der Review-Prozess neugestartet.
                        </StyledCell>
                    </StyledElementBody>}

                    {/*Review status*/}
                    <StyledElementBody>
                        <StyledCell style={{ gridColumn: "1 / span 2" }}>
                            <StyledDivForCheckMarkersForEveryReview> {"Status: "}
                                {ecoElement.reviews !== undefined && ecoElement.reviews.length > 0 &&
                                    ecoElement.reviews.map((review) => (
                                        review.positive? <FaCheck key={review.author} className="positive"/>
                                        : <FaTimes key={review.author} className="negative"/> )
                                    )}

                                {returnPercentageOfPositiveReviews(ecoElement)}

                                </StyledDivForCheckMarkersForEveryReview>
                        </StyledCell>
                    </StyledElementBody>

                    {/*review system description*/}
                    <StyledElementBody>
                        <StyledCell style={{ gridColumn: "1 / span 2" }}>
                            Für eine Bestätigung werden mindestens 3 positive und insgesamt 75% positive Reviews benötigt.
                        </StyledCell>
                    </StyledElementBody>

                    {/*Show comments*/}
                    <StyledElementBody>
                        <StyledCell style={{ gridColumn: "1 / span 2" }}>
                            {ecoElement.reviews.filter((review) => (review.reviewComment !== "")).length}
                            {" Kommentare "}
                            {commentSectionIsOpen? <FaRegArrowAltCircleUp onClick={handleShowCommentsSection}/>
                                    : <FaRegArrowAltCircleDown onClick={handleShowCommentsSection}/>}
                        </StyledCell>
                        {commentSectionIsOpen &&
                            <StyledCell style={{ gridColumn: "1 / span 2" }}>
                                <StyledListForComments>
                                {ecoElement.reviews.filter((review) => (review.reviewComment !== ""))
                                    .map((review) => (<li key={review.author}>"{review.reviewComment}" ({review.author}, {review.dateReviewedExternal})</li>))}
                                </StyledListForComments>
                            </StyledCell>
                        }
                    </StyledElementBody>


                    {/*Add your own review*/}
                    <StyledElementBody>
                        <StyledCell style={{ gridColumn: "1 / span 2" }}>
                            {returnHeadlineForAddingAReview(ecoElement)} {addReviewSectionIsOpen? <FaRegArrowAltCircleUp onClick={handleShowAddReviewSection}/>
                            : <FaRegArrowAltCircleDown onClick={handleShowAddReviewSection}/>}
                        </StyledCell>
                        {addReviewSectionIsOpen &&
                        <StyledCell style={{ gridColumn: "1 / span 2" }}>

                                <label style={{verticalAlign: "top"}} htmlFor="reviewComment">Comment (optional):</label> {" "}
                                <StyledTextboxForComments rows={3} maxLength={200} name="reviewComment" value={reviewComment} onChange={handleAddReviewCommentChange} type="text"/>
                                <StyledDivForAddingANewReview>Ihre Bewertung:
                                    <FaCheck name="positiveAddReviewButton" className="positive" onClick={handleAddReview}/>
                                    <FaTimes name="negativeAddReviewButton" className="negative" onClick={handleAddReview}/>
                                </StyledDivForAddingANewReview>

                        </StyledCell>
                        }
                        <StyledCell>
                        </StyledCell>
                    </StyledElementBody>



                </StyledWrapperTable>
            }

            <StyledDiv>

                <StyledElementPhoto src="/profilePics/placeholder.webp"/>

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

                        { ecoElement.lat && ecoElement.lat &&
                            <Marker key={ecoElement.id} position={[ecoElement.lon, ecoElement.lat]}
                                        title={ecoElement.name}>
                            <Popup>
                                        {ecoElement.name} <br/> {ecoElement.category} / {ecoElement.categorySub} / {ecoElement.address}
                            </Popup>
                        </Marker>
                        }

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
  width: 98%;
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
  grid-template-rows: min-content min-content min-content auto;
  width: 100%;
  grid-gap: 3px;
  font-size: 0.75em;
  line-height: 0.9em;
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

const StyledDivForCheckMarkersForEveryReview = styled.div`
  
  .negative{
    color: red;
    margin: -2px 2px;
  }
  
  .positive{
    color: green;
    margin: -2px 2px;
  }
`

const StyledListForComments = styled.ul`
      font-size: 2.9vmin;
      list-style: square;
      padding: 0 24px;
      margin: -7px 0 0 0;
`

const StyledDivForAddingANewReview = styled.div`
      padding: 6px 0;
      margin: 0;
      font-size: 1.15em;
      
    .negative{
        color: red;
        margin: -2px 5px;
    }
  
    .positive{
      color: green;
      margin: -2px 5px;
    }
`

const StyledTextboxForComments = styled.textarea`
    width: 95%;
    margin-top: 5px;
`