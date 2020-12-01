export default function translationService(word){

    switch (word){

        //categories
        case "FOODSTORE":
            return "Lebensmittelgeschäft";
        case "RESTAURANT":
            return "Restaurant";
        case "FAIRSHOP":
            return "Weltladen";

        //subcategories
        case "NONE":
            return "Sonstiges";
        case "FOODSTORE_SUPERMARKET":
            return "Bio-Supermarkt";
        case "FOODSTORE_NORMAL":
            return "Bioladen";
        case "FOODSTORE_HEALTHSTORE":
            return "Reformhaus";
        case "FOODSTORE_ZEROWASTESHOP":
            return "Unverpacktladen";
        case "FOODSTORE_FARMSHOP":
            return "Hofladen";
        case "RESTAURANT_SNACKBAR":
            return "Imbiss";
        case "RESTAURANT_CAFE":
            return "Café";
        case "RESTAURANR_RESTAURANT":
            return "Restaurant";
        case "RESTAURANT_ICECREAM_CAFE":
            return "Eiscafé";
        case "RESTAURANT_BAKERY":
            return "Bäckerei";
        case "FAIRSHOP_NORMAL":
            return "Weltladen";
        case "FAIRSHOP_TEMPORARY":
            return "Weltladen (temp.)";
        default:
            return word;
    }




}