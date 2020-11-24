import PageHeader from "./PageHeader";
import React, {useContext, useEffect} from "react";
import GreenBoxWithGradientBorderlineUntilSiteEnds from "./designElements/GreenBoxWithGradientBorderlineUntilSiteEnds";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import EcoElementContext from "./contexts/EcoElementContext";
import {getEcoElements} from "./services/EcoElementService";
import AddItemButton from "./designElements/buttons/AddItemButton";
import TabBarWithOneLink from "./designElements/TabBarWithOneLink";
import styled from "styled-components/macro";
import LoginTokenContext from "./contexts/LoginTokenContext";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


//to fix the "image not found"-bugs that occur when reloading the page
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;



export default function MapPage() {

    const {token} = useContext(LoginTokenContext);
    const {ecoElements, setEcoElements} = useContext(EcoElementContext);

    useEffect(() => {
        getEcoElements(token, setEcoElements);
    }, [token, setEcoElements]);


    return(

        <>
            <PageHeader title="EcoMap"/>

            <TabBarWithOneLink text="Show as List" link="/bo/list"/>

            <StyledContentDiv>

                    <MapContainer
                                  center={[51.4841, 7.2200]}
                                  zoom={13}
                                  minZoom={10}
                                  //topleft, bottomleft, bottomright, topright
                                  maxBounds={[[51.65, 6.4], [51.65, 6.4808], [51.3124, 7.8677], [51.6729, 7.8309]]}
                                  scrollWheelZoom={true}
                                  wheelDebounceTime={15}
                                  style={{height: "100%"}}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {

                            ecoElements?.map((element) => (

                                    <Marker key={element.id} position={[element.lon, element.lat]}
                                            title={element.name}>
                                        <Popup>
                                            {element.name} <br/> {element.category} / {element.categorySub} / {element.address}
                                        </Popup>
                                    </Marker>
                            ))
                        }



                    </MapContainer>

                <GreenBoxWithGradientBorderlineUntilSiteEnds/>



            </StyledContentDiv>

            <AddItemButton/>
        </>

    );
}



const StyledContentDiv = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr auto;
  grid-gap: 0;
`