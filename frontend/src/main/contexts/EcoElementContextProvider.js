import EcoElementContext from "./createContexts/EcoElementContext";
import React, {useState} from "react";

//Provides the EcoElements and the individual EcoElement loaded at this time through the whole app.
export default function EcoElementContextProvider({children}) {

    const [ecoElements, setEcoElements] = useState([]);
    const [ecoElement, setEcoElement] = useState({});

    return (

        <EcoElementContext.Provider value={{ecoElements, setEcoElements, ecoElement, setEcoElement}}>
            {children}
        </EcoElementContext.Provider>

    )


}