import React, {useEffect, useState} from "react";
import FilterListContext from "./FilterListContext";

export default function FilterListContextProvider({children}){

    const [filterListForCategory, setFilterListForCategory] = useState([]);
    const [filterListForCertificates, setFilterListForCertificates] = useState([]);
    const [filterListForLocation, setFilterListForLocation] = useState([]);
    const [showNonReviewedItems, setShowNonReviewedItems] = useState(false);
    const [filterIsActive, setFilterIsActive] = useState(false);


    //Use-effect to check if filter is active
    useEffect(() => {
        if (filterListForCategory.length === 0 && filterListForCertificates.length === 0 && filterListForCertificates.length === 0){
            setFilterIsActive(false);
            //console.log("Filter is not active")
        }
        else {
            setFilterIsActive(true);
            //console.log("Filter is active")
        }
    }, [filterListForCategory, filterListForCertificates, filterListForLocation])



    function returnIfItemsGetsFiltered(element){
        if (!filterIsActive){
            return true;
        }
        else {
            if (returnFilterCategories(element) && returnFilterCertificates(element) && returnFilterLocation(element)) {
                return true;
            } else {
                return false;
            }
        }
    }

    function returnFilterCertificates(element){

        if (filterListForCertificates.length !== 0) {
            //return true if element contains every searched certificate
            if (element.certificates !== null)
            {
                if (filterListForCertificates.every(filterElement => element.certificates.includes(filterElement))) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }
        return true;
    }

    function returnFilterCategories(element){

        if (filterListForCategory.length !== 0) {
            //return true if element belongs to searched category
            if (filterListForCategory.some(filterElement => element.categorySub === filterElement)) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    function returnFilterLocation(element){
        //return true if elements district is one of the searched districts
        /*if (filterListLocation.some(filterElement => element.district === filterElement)){
            return true;
        }
        else {
            return false;
        }*/
        return true;
    }


    return (
        <FilterListContext.Provider value={{returnIfItemsGetsFiltered, filterIsActive, filterListForCategory,
            setFilterListForCategory, filterListForCertificates, setFilterListForCertificates, filterListForLocation,
            setFilterListForLocation, showNonReviewedItems, setShowNonReviewedItems}}>
            {children}
        </FilterListContext.Provider>
    )

}