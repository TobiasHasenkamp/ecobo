import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import {Marker, Popup} from "react-leaflet";
import React, {useContext} from "react";
import FilterListContext from "../../contexts/FilterListContext";
import translationService from "../../services/translationService";
import styled from "styled-components/macro";
import mapCertificates from "../../services/mapCertificates";
import ShowElementIconButton from "../../designElements/buttons/ShowElementIconButton";

export default function MapMarkersForMap(ecoElements){

    const {returnIfItemsGetsFiltered} = useContext(FilterListContext);

    return (

        ecoElements?.filter(element => (returnIfItemsGetsFiltered(element))).map((element) => (
                                <Marker key={element.id} position={[element.lon, element.lat]}
                                        title={element.name}>
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
