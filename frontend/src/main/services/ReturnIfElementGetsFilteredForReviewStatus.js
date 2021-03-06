import {useContext} from "react";
import FilterContext from "../contexts/createContexts/FilterContext";

export default function ReturnIfElementGetsFilteredForReviewStatus(element){
    const {showNonReviewedItems} = useContext(FilterContext);

    if (showNonReviewedItems === false){
        return element.isReviewed;
    } else return true;
}