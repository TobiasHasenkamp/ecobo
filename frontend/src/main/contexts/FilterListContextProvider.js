import React, {useEffect, useState} from "react";
import FilterListContext from "./FilterListContext";

export default function FilterListContextProvider({children}){

    const [filterListForCategory, setFilterListForCategory] = useState([]);
    const [filterListForCertificates, setFilterListForCertificates] = useState([]);
    const [filterListForLocation, setFilterListForLocation] = useState([]);
    const [filterIsActive, setFilterIsActive] = useState(false);


    //Use-effect to check if filter is active
    useEffect(() => {
        if (filterListForCategory === [] && filterListForCertificates === [] && filterListForCertificates === []){
            setFilterIsActive(false);
            console.log("Filter is not active")
        }
        else {
            setFilterIsActive(false);
            console.log("Filter is active")
        }
    }, [filterListForCategory, filterListForCertificates, filterListForLocation])



    function returnIfItemsGetsFiltered(){
        if (returnFilterCategories() && returnFilterCertificates() && returnFilterLocation()){
            return true;
        }
        else {
            return false;
        }
    }

    function returnFilterCertificates(element){
        //return true if element contains every searched certificate
        if (filterListForCertificates.every(certificate => element.certificates.contains(certificate))){
            return true;
        }
        else {
            return false;
        }
    }

    function returnFilterCategories(element){
        //return true if element belongs to searched category
        if (filterListForCategory.some(category => element.categorySub === category)){
            return true;
        }
        else {
            return false;
        }
    }

    function returnFilterLocation(element){
        //return true if elements district is one of the searched districts
        /*if (filterListLocation.some(location => element.district === location)){
            return true;
        }
        else {
            return false;
        }*/
        return true;
    }


    return (
        <FilterListContext.Provider value={{filterIsActive, filterListForCategory, setFilterListForCategory, filterListForCertificates, setFilterListForCertificates, filterListForLocation, setFilterListForLocation}}>
            {children}
        </FilterListContext.Provider>
    )

}