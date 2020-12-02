import React from "react";
import FrontendInputContext from "./FrontendInputContext";

export default function FrontendInputContextProvider({children}){

    const categoryList = [
        "FASHIONSTORE",
        "FOODSTORE",
        "RESTAURANT",
        "FAIRSHOP",
        "OTHER"
    ]


    const subCategoryList = [
        "RESTAURANT_BAKERY",
        "FOODSTORE_NORMAL",
        "FOODSTORE_SUPERMARKET",
        "RESTAURANT_CAFE",
        "FASHIONSTORE_ECO_FASHION_STORE",
        "RESTAURANT_ICECREAM_CAFE",
        "FOODSTORE_FARMSHOP",
        "RESTAURANT_SNACKBAR",
        "FOODSTORE_HEALTHSTORE",
        "RESTAURANT_RESTAURANT",
        "FASHIONSTORE_SECOND_HAND_STORE",
        "FAIRSHOP_NORMAL",
        "OTHER"
    ]

    const certificateList = [
        "Accessoires",
        "Außerhausverkauf",
        "Babykleidung",
        "barrierefrei",
        "Bio",
        "Biofleisch",
        "Damenkleidung",
        "Fairtrade",
        "fahrradfreundlich",
        "gemeinwohlzertifiziert",
        "Herrenkleidung",
        "hundefreundlich",
        "Lieferservice",
        "Ökopapier",
        "Regionales Angebot",
        "Reuse & Repair",
        "Reuse & Second-Hand",
        "Schuhe",
        "Tauschen & Schenken",
        "tierversuchsfreie Kosmetik",
        "Unverpacktladen",
        "Veganes Angebot",
        "Vegetarisches Angebot"
    ]


    return (
        <FrontendInputContext.Provider value={{categoryList, subCategoryList, certificateList}}>
            {children}
        </FrontendInputContext.Provider>
    )

}