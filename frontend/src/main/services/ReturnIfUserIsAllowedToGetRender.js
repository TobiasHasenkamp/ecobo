import {useContext} from "react";
import LoginContext from "../contexts/createContexts/LoginContext";


export default function ReturnIfUserIsAllowedToGetRender(usernameToTest) {
    const {username} = useContext(LoginContext);

    if (usernameToTest === "anyUser" && username){
        return true;
    } else if (usernameToTest === username){
        return true;
    }

    //this only allows the render for the admin, the real request is still blocked in the backend
    else if (username === "Admin") return true;
    else return false;
}