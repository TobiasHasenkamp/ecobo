import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import {Marker, Popup} from "react-leaflet";
import React, {useContext} from "react";
import FilterListContext from "../../contexts/FilterListContext";
import translationService from "../../services/translationService";

export default function MapMarkersForMap(ecoElements){

    const {returnIfItemsGetsFiltered} = useContext(FilterListContext);

    return (

        ecoElements?.filter(element => (returnIfItemsGetsFiltered(element))).map((element) => (
                                <Marker key={element.id} position={[element.lon, element.lat]}
                                        title={element.name}>
                                    <Popup>
                                        {element.name} <br/> {translationService(element.categorySub)} <br/> {element.address}
                                    </Popup>
                                </Marker>
                ))
    )
}


