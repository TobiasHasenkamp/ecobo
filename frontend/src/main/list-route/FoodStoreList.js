import ShowElementIconButton from "../designElements/buttons/ShowElementIconButton";
import React from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "./StyledElementsForTableDesign";

export default function FoodStoreList({ecoElements, handleEditElement}){

    return (

            <StyledWrapperTable name="Bioläden">
                <StyledHeaderRow className="red">
                    Bioläden
                </StyledHeaderRow>
                {
                    ecoElements?.filter(element => element.category === "FOODSTORE").map((element) => (
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
                                    <ShowElementIconButton handle={handleEditElement}/>
                                </StyledIconDiv>
                            </StyledElementHeader>
                            <StyledElementBody>
                                <StyledCell>
                                    {element.categorySub}
                                </StyledCell>
                                <StyledCell>
                                    Symbole...
                                </StyledCell>
                            </StyledElementBody>
                            <div/>
                        </StyledElement>
                    ))
                }

            </StyledWrapperTable>

    )
}
