import React, {useContext} from "react";
import FilterContext from "../contexts/createContexts/FilterContext";
import {
    StyledCell,
    StyledElement, StyledElementBody,
    StyledElementHeader,
    StyledHeaderRow, StyledIconDiv,
    StyledNameCell, StyledWrapperTable
} from "./StyledElementsForTableDesign";
import ShowElementIconButton from "../designComponents/buttons/ShowElementIconButton";
import translationService from "../services/translationService";
import mapCertificates from "../services/mapCertificates";
import ReturnIfElementGetsFilteredForReviewStatus from "../services/ReturnIfElementGetsFilteredForReviewStatus";
import InReviewProcessIcon from "../designComponents/icons/ItemIsInReviewProcessIcon";

export default function FilterResultList({ecoElements}){

    const {returnIfItemGetsFiltered} = useContext(FilterContext);

    return(

        <StyledWrapperTable name="Ergebnisse">
            <StyledHeaderRow className="lightgrey">
                {"Ergebnisse "}
            </StyledHeaderRow>
            {
                ecoElements?.filter(element => (returnIfItemGetsFiltered(element)))
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
            {
                (ecoElements.filter(element => (returnIfItemGetsFiltered(element)))
                    .filter(element => ReturnIfElementGetsFilteredForReviewStatus(element)).length === 0) && <p style={{margin: "15px"}}>Keine Ergebnisse gefunden.</p>
            }

        </StyledWrapperTable>



    )

}