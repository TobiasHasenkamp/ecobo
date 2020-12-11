import LoginTokenContext from "./LoginTokenContext";
import React, {useState, useEffect} from "react";
import jwtDecode from "jwt-decode";
import loadTokenFromLocalStorage from "../services/loadTokenFromLocalStorage";
import getUserdataFromTokenFromLocalStorage from "../services/getUserdataFromTokenFromLocalStorage";

export default function LoginTokenContextProvider({children}){

    const [token, setToken] = useState(loadTokenFromLocalStorage());
    const [username, setUsername] = useState(getUserdataFromTokenFromLocalStorage.username);
    const [password, setPassword] = useState(getUserdataFromTokenFromLocalStorage.password);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        console.log("is logged in: " + isLoggedIn);
    }, [isLoggedIn, token])

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp > new Date().getTime() / 1000) {
                    localStorage.setItem("ACCESS_TOKEN", token);
                    setUsername(decodedToken.sub);
                    setIsLoggedIn(true);
                    }
                else {
                    localStorage.clear();
                }
                } catch(e) {
                console.log(e);
            }
        }
    }, [token]);

    return (

        <LoginTokenContext.Provider value={{token, setToken, username, setUsername, password, setPassword, isLoggedIn,
            setIsLoggedIn, userData, setUserData}}>
            {children}
        </LoginTokenContext.Provider>

    )

}