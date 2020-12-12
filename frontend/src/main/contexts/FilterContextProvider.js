import React, {useEffect, useState} from "react";
import FilterContext from "./createContexts/FilterContext";

//Provides the functionality of the Filters throughout the App.
export default function FilterContextProvider({children}){

    const [filterListForCategory, setFilterListForCategory] = useState([]);
    const [filterListForCertificates, setFilterListForCertificates] = useState([]);
    const [filterListForLocation, setFilterListForLocation] = useState([]);
    const [showNonReviewedItems, setShowNonReviewedItems] = useState(false);
    const [filterIsActive, setFilterIsActive] = useState(false);


    useEffect(() => {
        if (filterListForCategory.length === 0 && filterListForCertificates.length === 0 && filterListForLocation.length === 0){
            setFilterIsActive(false);
        } else {
            setFilterIsActive(true);
        }
    }, [filterListForCategory, filterListForCertificates, filterListForLocation])


    function returnIfItemGetsFiltered(element){
        if (!filterIsActive) return true;
        else {
            if (returnIfItemGetsFilteredForSubcategory(element) && returnIfItemGetsFilteredForCertificates(element) && returnIfItemGetsFilteredForLocation(element)) {
                return true;
            } else return false;
        }
    }

    function returnIfItemGetsFilteredForSubcategory(element){
        if (filterListForCategory.length !== 0) {
            //return true if element belongs to one of the searched categories
            if (filterListForCategory.some(filterElement => element.categorySub === filterElement)) {
                return true;
            } else return false;
        } return true;
    }

    function returnIfItemGetsFilteredForCertificates(element){
        if (filterListForCertificates.length !== 0) {
            //return true if element contains every searched certificate
            if (element.certificates !== null)
            {
                if (filterListForCertificates.every(filterElement => element.certificates.includes(filterElement))) {
                    return true;
                } else return false;
            } return false;
        } return true;
    }

    function returnIfItemGetsFilteredForLocation(element){
        if (filterListForLocation.length !== 0) {
            //return true if element belongs to one of the searched location
            if (filterListForLocation.some(filterElement => element.district === filterElement)) {
                return true;
            } else return false;
        } return true;
    }


    return (
        <FilterContext.Provider value={{
                    returnIfItemGetsFiltered, filterIsActive,
                    filterListForCategory, filterListForCertificates, filterListForLocation,
                    setFilterListForCategory, setFilterListForCertificates, setFilterListForLocation,
                    showNonReviewedItems, setShowNonReviewedItems
        }}>
            {children}
        </FilterContext.Provider>
    )

}