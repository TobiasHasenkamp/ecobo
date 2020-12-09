import {useContext} from "react";
import LoginTokenContext from "../../contexts/LoginTokenContext";


export default function ReturnIfUserIsAllowedToGetRender(usernameToTest) {

    const {username} = useContext(LoginTokenContext);

    if (usernameToTest === "anyUser" && username){
        return true;
    }
    else if (usernameToTest === username){
        return true;
    }
    //this only allows the render for the admin, the real request is still blocked in the backend
    else if (username === "admin"){
        return true;
    }
    else {
        return false;
    }

}