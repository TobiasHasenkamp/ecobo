import LoginTokenContext from "./LoginTokenContext";
import React, {useState} from "react";
import jwtDecode from "jwt-decode";
import {useEffect} from "react";

export default function LoginTokenContextProvider({children}){

    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [username, setUsername] = useState(jwtDecode(localStorage.getItem("ACCESS_TOKEN")).username);
    const [password, setPassword] = useState(jwtDecode(localStorage.getItem("ACCESS_TOKEN")).password);

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