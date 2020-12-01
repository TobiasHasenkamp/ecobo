import ShowElementIconButton from "../designElements/buttons/ShowElementIconButton";
import React, {useContext, useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "./StyledElementsForTableDesign";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import FilterListContext from "../contexts/FilterListContext";

export default function FoodStoreList({ecoElements}){

    const [foodStoreTableIsOpen, setFoodStoreTableIsOpen] = useState(true);
    const {returnIfItemsGetsFiltered} = useContext(FilterListContext);

    function handleShowFoodStoreTable(){
        setFoodStoreTableIsOpen(!foodStoreTableIsOpen);
    }

    useEffect(() => {
        setFoodStoreTableIsOpen(true);
    }, [])


    return (

            <StyledWrapperTable name="Bioläden">
                <StyledHeaderRow className="red">
                    {"Bioläden "}
                    {foodStoreTableIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowFoodStoreTable}/>
                        : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowFoodStoreTable}/>}
                </StyledHeaderRow>
                { foodStoreTableIsOpen &&
                    ecoElements?.filter(element => (returnIfItemsGetsFiltered(element))).filter(element => element.category === "FOODSTORE").map((element) => (
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
