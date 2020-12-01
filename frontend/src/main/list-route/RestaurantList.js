import ShowElementIconButton from "../designElements/buttons/ShowElementIconButton";
import React, {useEffect, useState} from "react";
import {StyledWrapperTable, StyledHeaderRow, StyledElement, StyledElementHeader, StyledNameCell,
    StyledCell, StyledIconDiv, StyledElementBody} from "./StyledElementsForTableDesign";
import {FaRegArrowAltCircleDown, FaRegArrowAltCircleUp} from "react-icons/fa";
import returnCertificateIcon from "../services/returnCertificateIcon";
import translationService from "../services/translationService";

export default function RestaurantList({ecoElements}){

    const [restaurantTableIsOpen, setRestaurantTableIsOpen] = useState(true);

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
                ecoElements?.filter(element => element.category === "RESTAURANT").map((element) => (
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