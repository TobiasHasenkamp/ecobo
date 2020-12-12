import ShowElementIconButton from "../designComponents/buttons/ShowElementIconButton";
import React, {useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "../designComponents/tableDesign/StyledElementsForTableDesign";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import translationService from "../services/translationService";
import mapCertificates from "../services/mapCertificates";
import ReturnIfElementGetsFilteredForReviewStatus from "../services/ReturnIfElementGetsFilteredForReviewStatus";
import InReviewProcessIcon from "../designComponents/icons/ItemIsInReviewProcessIcon";

export default function OthersList({ecoElements}){

    const [othersTableIsOpen, setOthersTableIsOpen] = useState(true);

    function handleShowOthersTable(){
        setOthersTableIsOpen(!othersTableIsOpen);
    }

    useEffect(() => {
        setOthersTableIsOpen(true);
    }, [])


    return (

            <StyledWrapperTable name="Sonstige">
                <StyledHeaderRow className="green">
                    {"Sonstige "}
                    {othersTableIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowOthersTable}/>
                        : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowOthersTable}/>}
                </StyledHeaderRow>
                { othersTableIsOpen &&
                    ecoElements?.filter(element => element.category === "OTHER")
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
