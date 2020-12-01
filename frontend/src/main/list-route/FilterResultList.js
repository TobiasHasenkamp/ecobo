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
import returnCertificateIcon from "../services/returnCertificateIcon";

export default function FilterResultList({ecoElements}){

    const {returnIfItemsGetsFiltered} = useContext(FilterListContext);

    return(

        <StyledWrapperTable name="Ergebnisse">
            <StyledHeaderRow className="lightgrey">
                {"Ergebnisse "}
            </StyledHeaderRow>
            {
                ecoElements?.filter(element => (returnIfItemsGetsFiltered(element))).map((element) => (
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
                                {element.categorySub}
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
            {
                (ecoElements.filter(element => (returnIfItemsGetsFiltered(element))).length === 0) && <p style={{margin: "15px"}}>Keine Ergebnisse gefunden.</p>
            }

        </StyledWrapperTable>



    )

}