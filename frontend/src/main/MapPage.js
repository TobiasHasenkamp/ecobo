import PageHeader from "./PageHeader";
import React from "react";
import styled from "styled-components/macro";
import GreenBoxWithGradientBorderlineUntilSiteEnds from "./designElements/GreenBoxWithGradientBorderlineUntilSiteEnds";
import {Link} from "react-router-dom";

export default function MapPage() {

    return(

        <>
            <PageHeader title="EcoMap"/>

            <StyledTabBar><Link to="/bo/list">Show as List</Link></StyledTabBar>

            <StyledMapPlaceholder>Map placeholder</StyledMapPlaceholder>
            <GreenBoxWithGradientBorderlineUntilSiteEnds/>
        </>

    );
}


const StyledMapPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ghostwhite;
  background-color: steelblue;
  height: 60vh;
  margin-top: var(--m);
  margin-bottom: var(--m);
  width: 100%;
`

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