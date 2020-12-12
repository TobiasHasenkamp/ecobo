export default function loadTokenFromLocalStorage(){

    try {
        return localStorage.getItem("ACCESS_TOKEN");
    } catch (e){
        console.log(e);
        return "";
    }
}