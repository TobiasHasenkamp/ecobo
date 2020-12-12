import React from "react";
import translationService from "../../services/translationService";

//this returns which subcategories can be added to an EcoElement in dependency to the chosen category
export default function AvailableSubcategoryMenuItems(category){

    const listOfItemsToReturn = [];

    if (category === "FOODSTORE") {
        listOfItemsToReturn.push("FOODSTORE_NORMAL");
        listOfItemsToReturn.push("FOODSTORE_SUPERMARKET");
        listOfItemsToReturn.push("FOODSTORE_FARMSHOP");
        listOfItemsToReturn.push("FOODSTORE_HEALTHSTORE");
    }
    else if (category === "RESTAURANT"){
        listOfItemsToReturn.push("RESTAURANT_BAKERY");
        listOfItemsToReturn.push("RESTAURANT_CAFE");
        listOfItemsToReturn.push("RESTAURANT_ICECREAM_CAFE");
        listOfItemsToReturn.push("RESTAURANT_SNACKBAR");
        listOfItemsToReturn.push("RESTAURANT_RESTAURANT");
    }
    else if (category === "FAIRSHOP"){
        listOfItemsToReturn.push("FAIRSHOP_NORMAL");
    }
    else if (category === "FASHIONSTORE"){
        listOfItemsToReturn.push("FASHIONSTORE_ECO_FASHION_STORE");
        listOfItemsToReturn.push("FASHIONSTORE_SECOND_HAND_STORE");
    }
    else if (category === "OTHER"){
        listOfItemsToReturn.push("OTHER");
    }

    return listOfItemsToReturn.map(item => <option value={item} key={item}>{translationService(item)}</option>)


}