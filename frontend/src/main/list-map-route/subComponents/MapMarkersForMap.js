import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import {Marker, Popup} from "react-leaflet";
import React, {useContext} from "react";
import FilterListContext from "../../contexts/FilterListContext";
import translationService from "../../services/translationService";
import styled from "styled-components/macro";
import mapCertificates from "../../services/mapCertificates";
import ShowElementIconButton from "../../designElements/buttons/ShowElementIconButton";
import L from "leaflet";



export default function MapMarkersForMap(ecoElements){

    const {returnIfItemsGetsFiltered} = useContext(FilterListContext);


    function returnMarkerIcon(category, categorySub){

        //later change the apikey into a env-variable, but how?
        const apikey = "7611146e203d46b7a43e78485065f463";
        let color;
        let icon;

        switch(category){
            case "FOODSTORE": color="23b3200c"
                break;
            case "FASHIONSTORE": color="230066cc"
                break;
            case "FAIRSHOP": color="23993399"
                break;
            case "RESTAURANT": color="23eba434"
                break;
            case "OTHER": color="2300802b"
                break;
            default: color="2300802b"
        }

        switch(categorySub){
            case "FOODSTORE_SUPERMARKET": icon="shopping-cart"
                break;
            case "FOODSTORE_NORMAL": icon="store"
                break;
            case "FOODSTORE_HEALTHSTORE": icon="store-alt"
                break;
            case "FOODSTORE_FARMSHOP": icon="warehouse"
                break;
            case "RESTAURANT_SNACKBAR": icon="hamburger"
                break;
            case "RESTAURANT_CAFE": icon="coffee"
                break;
            case "RESTAURANT_RESTAURANT": icon="utensils"
                break;
            case "RESTAURANT_ICECREAM_CAFE": icon="ice-cream"
                break;
            case "RESTAURANT_BAKERY": icon="bread-slice"
                break;
            case "FAIRSHOP_NORMAL": icon="globe-americas"
                break;
            case "FASHIONSTORE_ECO_FASHION_STORE": icon="tshirt"
                break;
            case "FASHIONSTORE_SECOND_HAND_STORE": icon="vest"
                break;
            case "OTHER": icon="bookmark"
                break;
            default: icon="bookmark"
        }


        const iconHtml = "<img src='https://api.geoapify.com/v1/icon/?type=awesome&color=%" +
                color + "&size=large&icon=" + icon + "&iconSize=small&textSize=small&apiKey=" + apikey + "' alt='marker'/>";


        return L.divIcon({
            html: iconHtml,
            iconSize: [0, 0],
            iconAnchor: [0, 0]
        })

    }


        return (

            ecoElements?.filter(element => (returnIfItemsGetsFiltered(element))).map((element) => (
                <Marker key={element.id} position={[element.lon, element.lat]}
                        title={element.name} icon={returnMarkerIcon(element.category, element.categorySub)}>
                    <StyledPopup>
                        <StyledPopupHeader>
                            {element.name}
                            <ShowElementIconButton elementId={element.id}/>
                        </StyledPopupHeader>
                        {translationService(element.categorySub)} <br/> {element.address} <br/>
                        <StyledMappedCertificates>
                            {mapCertificates(element, "small")}
                        </StyledMappedCertificates>



                    </StyledPopup>
                </Marker>
            ))
        )
}


const StyledPopup = styled(Popup)`
    font-size: 1.15em;
`

const StyledPopupHeader = styled.div`
      font-weight: bold;
      font-size: 1.15em;
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 10px;
      justify-content: left;
      margin-right: 15px;
`

const StyledMappedCertificates = styled.div`
    margin-top: 4px;
`
