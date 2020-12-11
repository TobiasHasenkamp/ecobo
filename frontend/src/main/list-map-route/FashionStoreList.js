import ShowElementIconButton from "../designComponents/buttons/ShowElementIconButton";
import React, {useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "./StyledElementsForTableDesign";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import translationService from "../services/translationService";
import mapCertificates from "../services/mapCertificates";
import ReturnIfElementGetsFilteredForReviewStatus from "../services/ReturnIfElementGetsFilteredForReviewStatus";
import InReviewProcessIcon from "../designComponents/icons/ItemIsInReviewProcessIcon";

export default function FashionStoreList({ecoElements}){

    const [fashionStoreTableIsOpen, setFashionStoreTableIsOpen] = useState(true);


    function handleShowFashionStoreTable(){
        setFashionStoreTableIsOpen(!fashionStoreTableIsOpen);
    }

    useEffect(() => {
        setFashionStoreTableIsOpen(true);
    }, [])


    return (

        <StyledWrapperTable name="Kleidungsläden">
            <StyledHeaderRow className="blue">
                {"Kleidungsläden "}
                {fashionStoreTableIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowFashionStoreTable}/>
                    : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowFashionStoreTable}/>}
            </StyledHeaderRow>
            { fashionStoreTableIsOpen &&
            ecoElements?.filter(element => element.category === "FASHIONSTORE")
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
