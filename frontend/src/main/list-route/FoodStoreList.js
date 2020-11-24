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
                    ecoElements?.map((element) => (
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
                                    {element.category}
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
