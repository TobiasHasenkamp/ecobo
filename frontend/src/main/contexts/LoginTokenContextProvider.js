import LoginTokenContext from "./LoginTokenContext";
import React, {useState, useEffect} from "react";
import jwtDecode from "jwt-decode";
import loadTokenFromLocalStorage from "../account-route/methods/loadTokenFromLocalStorage";
import getUsernameFromTokenFromLocalStorage from "../account-route/methods/getUsernameFromTokenFromLocalStorage";
import getPasswordFromTokenFromLocalStorage from "../account-route/methods/getPasswordFromTokenFromLocalStorage";

export default function LoginTokenContextProvider({children}){

    const [token, setToken] = useState(loadTokenFromLocalStorage());
    const [username, setUsername] = useState(getUsernameFromTokenFromLocalStorage);
    const [password, setPassword] = useState(getPasswordFromTokenFromLocalStorage);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        console.log("is logged in: " + isLoggedIn);
    })

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp > new Date().getTime() / 1000) {
                    localStorage.setItem("ACCESS_TOKEN", token);
                    setUsername(decodedToken.sub);
                    setIsLoggedIn(true);
                    }
                } catch(e) {
                setIsLoggedIn(false);
                console.log(e);
            }
        }
    }, [token]);

    return (

        <LoginTokenContext.Provider value={{token, setToken, username, setUsername, password, setPassword, isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoginTokenContext.Provider>

    )

}