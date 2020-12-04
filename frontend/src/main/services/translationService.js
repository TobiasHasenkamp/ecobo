export default function translationService(word){

    switch (word){

        //categories
        case "FOODSTORE":
            return "Lebensmittelgeschäft";
        case "FASHIONSTORE":
            return "Kleidungsladen";
        case "RESTAURANT":
            return "Restaurant";
        case "FAIRSHOP":
            return "Weltladen";

        //subcategories
        case "NONE":
            return "Sonstiges";
        case "FASHIONSTORE_ECO_FASHION_STORE":
            return "Eco-Fashion-Store";
        case "FASHIONSTORE_SECOND_HAND_STORE":
            return "Second-Hand-Laden";
        case "FOODSTORE_SUPERMARKET":
            return "Bio-Supermarkt";
        case "FOODSTORE_NORMAL":
            return "Bioladen";
        case "FOODSTORE_HEALTHSTORE":
            return "Reformhaus";
        case "FOODSTORE_FARMSHOP":
            return "Hofladen";
        case "RESTAURANT_SNACKBAR":
            return "Imbiss";
        case "RESTAURANT_CAFE":
            return "Café";
        case "RESTAURANT_RESTAURANT":
            return "Restaurant ";
        case "RESTAURANT_ICECREAM_CAFE":
            return "Eiscafé";
        case "RESTAURANT_BAKERY":
            return "Bäckerei";
        case "FAIRSHOP_NORMAL":
            return "Weltladen ";
        case "OTHER":
            return "Sonstiges"
        default:
            return word;
    }




}