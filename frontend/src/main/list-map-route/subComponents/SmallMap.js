import {MapContainer, Marker, TileLayer} from "react-leaflet";
import markerIcon from "../../designComponents/mapElements/MarkerIcon";
import React from "react";
import styled from "styled-components/macro";

export default function SmallMap({ecoElement, randomKeyToForceRerender}){

    return (

        <SmallMapSection>
            {ecoElement.lat && ecoElement.lon &&
                <MapContainer
                    key={randomKeyToForceRerender}
                    center={[ecoElement.lon, ecoElement.lat]}
                    zoom={16}
                    minZoom={12}
                    //topleft, bottomleft, bottomright, topright
                    maxBounds={[[51.65, 6.4], [51.65, 6.4808], [51.3124, 7.8677], [51.6729, 7.8309]]}
                    scrollWheelZoom={"center"}
                    wheelDebounceTime={15}
                    dragging={false}
                    className={"map"}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { ecoElement.lat && ecoElement.lon &&
                        <Marker key={ecoElement.id} position={[ecoElement.lon, ecoElement.lat]}
                                title={ecoElement.name} icon={markerIcon(ecoElement.category, ecoElement.categorySub)}>
                        </Marker>
                    }
                </MapContainer>
            }
        </SmallMapSection>
    )
}

const SmallMapSection = styled.section`
  grid-row: span 2;
  height: 98%;
  width: 99%;
  .map {
    height: 100%;
    width: 100%;
    border: var(--neutral-color-darkgrey) solid 1.5px;
  }
`