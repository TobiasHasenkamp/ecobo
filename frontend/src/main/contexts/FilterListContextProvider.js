import React, {useState} from "react";
import FilterListContext from "./FilterListContext";

export default function FilterListContextProvider({children}){

    const [filterList, setFilterList] = useState([]);

    return (
        <FilterListContext.Provider value={{filterList, setFilterList}}>
            {children}
        </FilterListContext.Provider>

    )

}