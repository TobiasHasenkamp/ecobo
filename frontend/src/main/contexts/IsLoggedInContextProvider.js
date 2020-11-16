import IsLoggedInContext from "./IsLoggedInContext";
import React, {useState} from "react";

export default function IsLoggedInContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function switchLoginStatus(value){
        setIsLoggedIn(value);
    }

    return (

        <IsLoggedInContext.Provider value={{switchLoginStatus, isLoggedIn}}>
            {children}
        </IsLoggedInContext.Provider>

    )
}