import ShowElementIconButton from "../designElements/buttons/ShowElementIconButton";
import React, {useContext, useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "./StyledElementsForTableDesign";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import FilterListContext from "../contexts/FilterListContext";

export default function RestaurantList({ecoElements}){

    const [restaurantTableIsOpen, setRestaurantTableIsOpen] = useState(true);
    const {returnIfItemsGetsFiltered} = useContext(FilterListContext);

    function handleShowRestaurantTable(){
        setRestaurantTableIsOpen(!restaurantTableIsOpen);
    }

    useEffect(() => {
        setRestaurantTableIsOpen(true);
    }, [])


    return (

        <StyledWrapperTable name="Restaurants">
            <StyledHeaderRow className="blue">
                {"Restaurants "}
                {restaurantTableIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowRestaurantTable}/>
                    : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowRestaurantTable}/>}
            </StyledHeaderRow>
            {
                restaurantTableIsOpen &&
                ecoElements?.filter(element => (returnIfItemsGetsFiltered(element))).filter(element => element.category === "RESTAURANT").map((element) => (
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