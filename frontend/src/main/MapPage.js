import PageHeader from "./PageHeader";
import React from "react";
import styled from "styled-components/macro";

export default function MapPage() {

    return(

        <div>
            <PageHeader title="EcoMap"/>
            <StyledMapPlaceholder>Map placeholder</StyledMapPlaceholder>
            <StyledDarkGreenBox/>
        </div>

    );
}


const StyledMapPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ghostwhite;
  background-color: steelblue;
  height: 425px;
  margin-top: var(--m);
  margin-bottom: var(--m);
  width: 100%;
`

const StyledDarkGreenBox = styled.div`
  display: block;
  width: 100%;
  background-color: var(--darkgreen);
  height: 75px;
`