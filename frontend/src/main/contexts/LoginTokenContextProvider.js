import LoginTokenContext from "./LoginTokenContext";
import React, {useState} from "react";
import jwtDecode from "jwt-decode";
import {useEffect} from "react";
import loadTokenFromLocalStorage from "../account-route/methods/loadTokenFromLocalStorage";
import getUsernameFromTokenFromLocalStorage from "../account-route/methods/getUsernameFromTokenFromLocalStorage";
import getPasswordFromTokenFromLocalStorage from "../account-route/methods/getPasswordFromTokenFromLocalStorage";

export default function LoginTokenContextProvider({children}){

    const [token, setToken] = useState(loadTokenFromLocalStorage());
    const [username, setUsername] = useState(getUsernameFromTokenFromLocalStorage);
    const [password, setPassword] = useState(getPasswordFromTokenFromLocalStorage);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp > new Date().getTime() / 1000) {
                    localStorage.setItem("ACCESS_TOKEN", token);
                    setUsername(decodedToken.username);
                    setPassword(decodedToken.password);
                    }
                } catch(e) {
                console.log(e);
            }
        }
    }, [token]);

    return (

        <LoginTokenContext.Provider value={{token, setToken, username, setUsername, password, setPassword}}>
            {children}
        </LoginTokenContext.Provider>

    )

}