import React, {useContext} from "react";
import FilterListContext from "../contexts/FilterListContext";
import {
    StyledCell,
    StyledElement, StyledElementBody,
    StyledElementHeader,
    StyledHeaderRow, StyledIconDiv,
    StyledNameCell, StyledWrapperTable
} from "./StyledElementsForTableDesign";
import ShowElementIconButton from "../designElements/buttons/ShowElementIconButton";
import translationService from "../services/translationService";
import mapCertificates from "../services/mapCertificates";
import ReturnIfElementGetsFilteredForReviewStatus from "./subComponents/ReturnIfElementGetsFilteredForReviewStatus";
import InReviewProcessIcon from "../designElements/buttons/InReviewProcessIcon";

export default function FilterResultList({ecoElements}){

    const {returnIfItemsGetsFiltered} = useContext(FilterListContext);

    return(

        <StyledWrapperTable name="Ergebnisse">
            <StyledHeaderRow className="lightgrey">
                {"Ergebnisse "}
            </StyledHeaderRow>
            {
                ecoElements?.filter(element => (returnIfItemsGetsFiltered(element)))
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
                (ecoElements.filter(element => (returnIfItemsGetsFiltered(element)))
                    .filter(element => ReturnIfElementGetsFilteredForReviewStatus(element)).length === 0) && <p style={{margin: "15px"}}>Keine Ergebnisse gefunden.</p>
            }

        </StyledWrapperTable>



    )

}