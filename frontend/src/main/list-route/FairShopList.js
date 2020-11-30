import ShowElementIconButton from "../designElements/buttons/ShowElementIconButton";
import React, {useContext, useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "./StyledElementsForTableDesign";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import FilterListContext from "../contexts/FilterListContext";

export default function FairShopList({ecoElements}){

    const [fairShopTableIsOpen, setFairShopTableIsOpen] = useState(true);
    const {filterForCategoryIsActive, setFilterForCategoryIsActive} = useContext(FilterListContext);
    const {filterForCategory, setFilterForCategory} = useContext(FilterListContext);

    function handleShowFairShopTable(){
        setFairShopTableIsOpen(!fairShopTableIsOpen);
    }

    useEffect(() => {
        setFairShopTableIsOpen(true);
    }, [])

    function filterAllowToShowFairShops(){
        if (!filterForCategoryIsActive){
            return true;
        }
        else if (filterForCategoryIsActive && filterForCategory === "Weltladen"){
            return true;
        }
        else {
            return false;
        }
    }

    return (

        <StyledWrapperTable name="Weltläden">
            <StyledHeaderRow className="yellow">
                {"Weltläden "}
                {fairShopTableIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowFairShopTable}/>
                    : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowFairShopTable}/>}

            </StyledHeaderRow>
            {
                fairShopTableIsOpen && filterAllowToShowFairShops() &&
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
