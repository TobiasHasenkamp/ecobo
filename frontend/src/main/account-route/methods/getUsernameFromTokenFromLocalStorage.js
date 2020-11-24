import jwtDecode from "jwt-decode";

export default function getUsernameFromTokenFromLocalStorage(){

    try {
        return jwtDecode(localStorage.getItem("ACCESS_TOKEN")).username;
    } catch (e){
        console.log(e);
        return "";
    }

}