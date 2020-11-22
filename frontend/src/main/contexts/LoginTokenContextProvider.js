import LoginTokenContext from "./LoginTokenContext";
import React, {useState} from "react";

export default function LoginTokenContextProvider({children}){

    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    return (

        <LoginTokenContext.Provider value={{token, setToken}}>
            {children}
        </LoginTokenContext.Provider>

    )

}