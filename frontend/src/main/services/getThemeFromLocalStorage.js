export default function getThemeFromLocalStorage(){
    try {
        return localStorage.getItem("THEME_DATA");
    } catch (e){
        return "Standard";
    }
}