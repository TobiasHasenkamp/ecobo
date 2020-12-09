import {useContext} from "react";
import FilterListContext from "../../contexts/FilterListContext";

export default function ReturnFilterReviewFunction(element){

    const {showNonReviewedItems} = useContext(FilterListContext);

    if (showNonReviewedItems === false){
        return element.isReviewed;
    }
    else {
        return true;
    }
}