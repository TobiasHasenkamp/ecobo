import ShowElementIconButton from "../designComponents/buttons/ShowElementIconButton";
import React, {useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "../designComponents/tableDesign/StyledElementsForTableDesign";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import translationService from "../services/translationService";
import mapCertificates from "../services/mapCertificates";
import ReturnIfElementGetsFilteredForReviewStatus from "../services/ReturnIfElementGetsFilteredForReviewStatus";
import InReviewProcessIcon from "../designComponents/icons/ItemIsInReviewProcessIcon";

export default function RestaurantList({ecoElements}){

    const [restaurantTableIsOpen, setRestaurantTableIsOpen] = useState(true);

    function handleShowRestaurantTable(){
        setRestaurantTableIsOpen(!restaurantTableIsOpen);
    }

    useEffect(() => {
        setRestaurantTableIsOpen(true);
    }, [])


    return (

        <StyledWrapperTable name="Restaurants">
            <StyledHeaderRow className="orange">
                {"Restaurants "}
                {restaurantTableIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowRestaurantTable}/>
                    : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowRestaurantTable}/>}
            </StyledHeaderRow>
            {
                restaurantTableIsOpen &&
                ecoElements?.filter(element => element.category === "RESTAURANT")
                    .filter(element => ReturnIfElementGetsFilteredForReviewStatus(element))
                    .map((element) => (
                    <StyledElement key={element.id}>
                        <div/>
                        <StyledElementHeader>
                            <StyledNameCell>
                                <div>{element.name}{!element.isReviewed && <InReviewProcessIcon/>}</div>
                            </StyledNameCell>
                            <StyledCell>
                                {element.title}
                            </StyledCell>
                            <StyledIconDiv>
                                <ShowElementIconButton elementId={element.id}/>
                            </StyledIconDiv>
                        </StyledElementHeader>
                        <StyledElementBody>
                            <StyledCell>
                                {translationService(element.categorySub)}
                            </StyledCell>
                            <StyledCell>
                                {mapCertificates(element, "medium")}
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>
                ))
            }

        </StyledWrapperTable>

    )
}