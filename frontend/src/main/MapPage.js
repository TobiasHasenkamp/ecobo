import PageHeader from "./PageHeader";
import React, {useEffect} from "react";
import styled from "styled-components/macro";
import GreenBoxWithGradientBorderlineUntilSiteEnds from "./designElements/GreenBoxWithGradientBorderlineUntilSiteEnds";
import {Link} from "react-router-dom";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import GradientBorderlineTop from "./designElements/GradientBorderlineTop";
import GreenBoxMedium from "./designElements/GreenBoxMedium";

export default function MapPage() {

    useEffect(() => {

        //Add the leaflet css stylesheet to the pages head
        const leafletCSSStylesheet = document.createElement("link");
        document.head.append(leafletCSSStylesheet);
        leafletCSSStylesheet.setAttribute("rel", "stylesheet");
        leafletCSSStylesheet.setAttribute("href", "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css");
        leafletCSSStylesheet.setAttribute("integrity",
            "sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==");
        leafletCSSStylesheet.setAttribute("crossorigin", "");

        //Add the leaflet javascript file to the pages head
        const leafletJSFile = document.createElement("script");
        document.head.append(leafletJSFile);
        leafletJSFile.setAttribute("src", "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js");
        leafletJSFile.setAttribute("integrity",
            "sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==");
        leafletJSFile.setAttribute("crossorigin", "");

        //the crossOrigin doesn't work as intended the way it is implemented right now. it should render to 'crossorigin=""' but renders to 'crossorigin' inside
        //both the leafletJSFile and the leafletCSSStyleSheet in the head of the page. This seems to cause no problems right now, but maybe later?
    }, []);

    const firstPosition = [51.481, 7.2200];
    const secondPosition = [51.484, 7.2210];

    return(

        <>
            <PageHeader title="EcoMap"/>

            <StyledTabBar><Link to="/bo/list">Show as List</Link></StyledTabBar>

            <GradientBorderlineTop/>
            <GreenBoxMedium/>

            <MapContainer
                          center={[51.4841, 7.2200]}
                          zoom={13}
                          minZoom={10}
                          //topleft, bottomleft, bottomright, topright
                          maxBounds={[[51.65, 6.4], [51.65, 6.4808], [51.3124, 7.8677], [51.6729, 7.8309]]}
                          scrollWheelZoom={true}
                          wheelDebounceTime={15}
                          style={{minHeight: "65vh"}}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={firstPosition} title="TestTooltip" opacity="0.8" draggable="true">
                    <Popup>
                        1A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
                <Marker position={secondPosition}>
                    <Popup>
                        2A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>

            </MapContainer>


            <GreenBoxWithGradientBorderlineUntilSiteEnds/>
        </>

    );
}


const StyledTabBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 7px 5px 5px 5px;
  line-height: 0.85em;
  font-size: 0.9em;
  color: var(--darkgrey);
    a {
     color: var(--darkgrey);
     text-decoration: none;
     :hover {
         color: var(--darkgrey2);
      }
     :active {
         color: var(--lightgrey);
      }
    }
`