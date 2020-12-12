export default function ThemeChanger(value, theme, setTheme){

    setTheme(value);
    let documentElement = document.documentElement;

    if (value === "Standard"){
        documentElement.style.setProperty('--main-color', "#008744");
        documentElement.style.setProperty('--main-background-color', "white");
        documentElement.style.setProperty('--neutral-color-black', "black");
        documentElement.style.setProperty('--neutral-color-darkgrey', "#222831");
        documentElement.style.setProperty('--neutral-color-lightgrey', "#9BAEBC");
        documentElement.style.setProperty('--tag-color-grey', "lightgrey");
    }
    else if (value === "Dark Mode"){
        documentElement.style.setProperty('--main-color', "#222831");
        documentElement.style.setProperty('--main-background-color', "#878E99");
        documentElement.style.setProperty('--neutral-color-black', "black");
        documentElement.style.setProperty('--neutral-color-darkgrey', "black");
        documentElement.style.setProperty('--neutral-color-lightgrey', "#878E99");
        documentElement.style.setProperty('--tag-color-grey', "#D4D6B9");
    }
    else if (value === "Blue theme"){
        documentElement.style.setProperty('--main-color', "#054A91");
        documentElement.style.setProperty('--main-background-color', "white");
        documentElement.style.setProperty('--neutral-color-black', "black");
        documentElement.style.setProperty('--neutral-color-darkgrey', "#222831");
        documentElement.style.setProperty('--neutral-color-lightgrey', "#81A4CD");
        documentElement.style.setProperty('--tag-color-grey', "lightgrey");
    }
    else if (value === "Red theme"){
        documentElement.style.setProperty('--main-color', "#A31621");
        documentElement.style.setProperty('--main-background-color', "white");
        documentElement.style.setProperty('--neutral-color-black', "black");
        documentElement.style.setProperty('--neutral-color-darkgrey', "#222831");
        documentElement.style.setProperty('--neutral-color-lightgrey', "#9BAEBC");
        documentElement.style.setProperty('--tag-color-grey', "lightgrey");
    }
    else if (value === "Purple theme"){
        documentElement.style.setProperty('--main-color', "#310A31");
        documentElement.style.setProperty('--main-background-color', "white");
        documentElement.style.setProperty('--neutral-color-black', "black");
        documentElement.style.setProperty('--neutral-color-darkgrey', "#222831");
        documentElement.style.setProperty('--neutral-color-lightgrey', "#9BAEBC");
        documentElement.style.setProperty('--tag-color-grey', "lightgrey");
    }
    else documentElement.style.setProperty('--darkgreen', "#008744");
}