import styled from "styled-components/macro";
import React from "react";
import GradientBorderlineTop from "./GradientBorderlineTop";
import GreenBoxSmall from "./GreenBoxSmall";

export default function SmallHeaderBar({text}) {

    return (
        <>
            <HeaderBar><strong>{text}</strong></HeaderBar>
            <GradientBorderlineTop/>
            <GreenBoxSmall/>
        </>
    )
}


const HeaderBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 7px 5px 5px 5px;
  line-height: 0.85em;
  font-size: 0.9em;
  color: var(--neutral-color-darkgrey);
  
    a {
     color: var(--neutral-color-darkgrey);
     text-decoration: none;
     
        :hover {
             color: var(--neutral-color-darkgrey);
        }
          
        :active {
             color: var(----neutral-color-lightgrey);
          }
    }
`