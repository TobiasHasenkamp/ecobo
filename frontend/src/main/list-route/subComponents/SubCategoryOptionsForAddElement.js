import React from "react";
import translationService from "../../services/translationService";

export default function SubCategoryOptionsForAddElement(category){

    const optionList = [];

    if (category === "FOODSTORE") {
        optionList.push("FOODSTORE_NORMAL");
        optionList.push("FOODSTORE_SUPERMARKET");
        optionList.push("FOODSTORE_FARMSHOP");
        optionList.push("FOODSTORE_HEALTHSTORE");
    }
    else if (category === "RESTAURANT"){
        optionList.push("RESTAURANT_BAKERY");
        optionList.push("RESTAURANT_CAFE");
        optionList.push("RESTAURANT_ICECREAM_CAFE");
        optionList.push("RESTAURANT_SNACKBAR");
        optionList.push("RESTAURANT_RESTAURANT");
    }
    else if (category === "FAIRSHOP"){
        optionList.push("FAIRSHOP_NORMAL");
    }
    else if (category === "FASHIONSTORE"){
        optionList.push("FASHIONSTORE_ECO_FASHION_STORE");
        optionList.push("FASHIONSTORE_SECOND_HAND_STORE");
    }
    else if (category === "OTHER"){
        optionList.push("OTHER");
    }

    return optionList.map(item => <option key={item}>{translationService(item)}</option>)


}