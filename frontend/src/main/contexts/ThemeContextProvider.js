import React, {useEffect, useState} from "react";
import getThemeFromLocalStorage from "../services/getThemeFromLocalStorage";
import ThemeContext from "./createContexts/ThemeContext";
import ThemeChanger from "../account-route/ThemeChanger";

//Provides the ThemeChanging functionality throughout the App
export default function ThemeContextProvider({children}){

    const [theme, setTheme] = useState(getThemeFromLocalStorage);

    //useEffect to start the ThemeChanger once the theme changes
    useEffect(() => {
        ThemeChanger(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}