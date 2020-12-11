import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import styled from "styled-components/macro";

//this returns which certificates can be added to an EcoElement in dependency to the chosen category
export default function AvailableCertificateMenuItems(category, certificatesToAddList,
                                                      handleAddCertificateToAddList){

    const listOfItemsToReturn = [];

    //for all restaurants
    if (category === "RESTAURANT"){
        listOfItemsToReturn.push("Außerhausverkauf");
        listOfItemsToReturn.push("barrierefrei");
        listOfItemsToReturn.push("Bio");
        listOfItemsToReturn.push("Biofleisch");
        listOfItemsToReturn.push("Fairtrade");
        listOfItemsToReturn.push("fahrradfreundlich");
        listOfItemsToReturn.push("gemeinwohlzertifiziert");
        listOfItemsToReturn.push("hundefreundlich");
        listOfItemsToReturn.push("Lieferservice");
        listOfItemsToReturn.push("Regionales Angebot");
        listOfItemsToReturn.push("Veganes Angebot");
        listOfItemsToReturn.push("Vegetarisches Angebot");
    }

    //for all restaurants
    else if (category === "FOODSTORE"){
        listOfItemsToReturn.push("barrierefrei");
        listOfItemsToReturn.push("Biofleisch");
        listOfItemsToReturn.push("Bio");
        listOfItemsToReturn.push("Fairtrade");
        listOfItemsToReturn.push("gemeinwohlzertifiziert");
        listOfItemsToReturn.push("Ökopapier");
        listOfItemsToReturn.push("Regionales Angebot");
        listOfItemsToReturn.push("Reuse & Repair");
        listOfItemsToReturn.push("Tauschen & Schenken");
        listOfItemsToReturn.push("tierversuchsfreie Kosmetik");
        listOfItemsToReturn.push("Unverpacktladen");
        listOfItemsToReturn.push("Veganes Angebot");
        listOfItemsToReturn.push("Vegetarisches Angebot");
    }

    //for all fairshops
    else if (category === "FAIRSHOP"){
        listOfItemsToReturn.push("Accessoires");
        listOfItemsToReturn.push("Bio");
        listOfItemsToReturn.push("Damenkleidung");
        listOfItemsToReturn.push("Fairtrade");
        listOfItemsToReturn.push("gemeinwohlzertifiziert");
        listOfItemsToReturn.push("Herrenkleidung");
        listOfItemsToReturn.push("Reuse & Repair");
        listOfItemsToReturn.push("Reuse & Second-Hand");
        listOfItemsToReturn.push("tierversuchsfreie Kosmetik");
        listOfItemsToReturn.push("Tauschen & Schenken");
    }

    //for all eco-fashion-stores
    else if (category === "FASHIONSTORE"){
        listOfItemsToReturn.push("Accessoires");
        listOfItemsToReturn.push("Babykleidung");
        listOfItemsToReturn.push("Damenkleidung");
        listOfItemsToReturn.push("Fairtrade");
        listOfItemsToReturn.push("gemeinwohlzertifiziert");
        listOfItemsToReturn.push("Herrenkleidung");
        listOfItemsToReturn.push("Reuse & Second-Hand");
        listOfItemsToReturn.push("Schuhe");
        listOfItemsToReturn.push("Tauschen & Schenken");
    }

    else {
        listOfItemsToReturn.push("barrierefrei");
        listOfItemsToReturn.push("fahrradfreundlich");
        listOfItemsToReturn.push("gemeinwohlzertifiziert");
        listOfItemsToReturn.push("hundefreundlich");
        listOfItemsToReturn.push("Reuse & Repair");
        listOfItemsToReturn.push("Repair & Second-Hand");
        listOfItemsToReturn.push("Tauschen & Schenken");
    }


        return listOfItemsToReturn.filter(item => !certificatesToAddList.includes(item))
            .map(element => (
                    <StyledMenuItem name={element} key={element} onClick={handleAddCertificateToAddList}>
                        {element}
                    </StyledMenuItem>));
}


const StyledMenuItem = styled(MenuItem)`
    && {
        min-height: 20px;
        font-size: 0.92em;
        margin: 5px;
        padding: 5px;
        line-height: 1.5em;
    }
`