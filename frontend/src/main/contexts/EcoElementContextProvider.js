import EcoElementContext from "./EcoElementContext";
import React, {useState} from "react";

export default function EcoElementContextProvider({children}) {

    const [ecoElements, setEcoElements] = useState([]);

    return (

        <EcoElementContext.Provider value={{ecoElements, setEcoElements}}>
            {children}
        </EcoElementContext.Provider>

    )


}