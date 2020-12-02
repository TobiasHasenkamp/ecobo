import ShowElementIconButton from "../designElements/buttons/ShowElementIconButton";
import React, {useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "./StyledElementsForTableDesign";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import translationService from "../services/translationService";
import mapCertificates from "../services/mapCertificates";

export default function FairShopList({ecoElements}){

    const [fairShopTableIsOpen, setFairShopTableIsOpen] = useState(true);

    function handleShowFairShopTable(){
        setFairShopTableIsOpen(!fairShopTableIsOpen);
    }

    useEffect(() => {
        setFairShopTableIsOpen(true);
    }, [])


    return (

        <StyledWrapperTable name="Weltläden">
            <StyledHeaderRow className="purple">
                {"Weltläden "}
                {fairShopTableIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowFairShopTable}/>
                    : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowFairShopTable}/>}

            </StyledHeaderRow>
            {
                fairShopTableIsOpen &&
                ecoElements?.filter(element => element.category === "FAIRSHOP").map((element) => (
                    <StyledElement key={element.id}>
                        <div/>
                        <StyledElementHeader>
                            <StyledNameCell>
                                {element.name}
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
