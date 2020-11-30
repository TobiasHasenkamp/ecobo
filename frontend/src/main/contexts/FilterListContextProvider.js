import React, {useEffect, useState} from "react";
import FilterListContext from "./FilterListContext";

export default function FilterListContextProvider({children}){

    const [filterForCategory, setFilterForCategory] = useState(undefined);
    const [filterList, setFilterList] = useState([]);
    const [filterForCategoryIsActive, setFilterForCategoryIsActive] = useState(false);


    //Use-effect to check if filter for Category is active
    useEffect(() => {
        if (filterForCategory === undefined){
            setFilterForCategoryIsActive(false);
            console.log("Filter is not active")
        }
        else {
            setFilterForCategoryIsActive(true);
            console.log("Filter is active")
        }
    }, [filterForCategory])

    useEffect(() => {
        console.log("filterforcategory is active? :" + filterForCategoryIsActive);
    }, [filterForCategoryIsActive])


    useEffect(() => {
        console.log("Filter for category: " + filterForCategory)
    }, [filterForCategory])


    return (
        <FilterListContext.Provider value={{filterList, setFilterList, filterForCategory, setFilterForCategory, filterForCategoryIsActive, setFilterForCategoryIsActive}}>
            {children}
        </FilterListContext.Provider>

    )

}