import PageHeader from "./PageHeader";
import React from "react";
import styled from "styled-components/macro";
import GreenBoxWithGradientBorderlineUntilSiteEnds from "./designElements/GreenBoxWithGradientBorderlineUntilSiteEnds";

export default function MapPage() {

    return(

        <>
            <PageHeader title="EcoMap"/>
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