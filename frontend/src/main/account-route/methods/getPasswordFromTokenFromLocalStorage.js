import jwtDecode from "jwt-decode";

export default function getPasswordFromTokenFromLocalStorage(){

    try {
        return jwtDecode(localStorage.getItem("ACCESS_TOKEN")).password;
    } catch (e){
        return "";
    }

}