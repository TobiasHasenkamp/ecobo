import jwtDecode from "jwt-decode";

export default function getUserdataFromTokenFromLocalStorage(){

    try {
        return jwtDecode(localStorage.getItem("ACCESS_TOKEN"));
    } catch (e){
        return "";
    }

}