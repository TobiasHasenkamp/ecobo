import ShowElementIconButton from "../designElements/buttons/ShowElementIconButton";
import React, {useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "./StyledElementsForTableDesign";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import returnCertificateIcon from "../services/returnCertificateIcon";
import translationService from "../services/translationService";

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
            <StyledHeaderRow className="yellow">
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
                                {element.certificates?
                                    element.certificates?.map(certificate => returnCertificateIcon(certificate))
                                    : " - "}
                            </StyledCell>
                        </StyledElementBody>
                        <div/>
                    </StyledElement>
                ))
            }

        </StyledWrapperTable>

    )
}
