import EcoElementContext from "./EcoElementContext";
import React, {useState} from "react";

export default function EcoElementContextProvider({children}) {

    const [ecoElements, setEcoElements] = useState([]);
    const [ecoElement, setEcoElement] = useState({});

    return (

        <EcoElementContext.Provider value={{ecoElements, setEcoElements, ecoElement, setEcoElement}}>
            {children}
        </EcoElementContext.Provider>

    )


}