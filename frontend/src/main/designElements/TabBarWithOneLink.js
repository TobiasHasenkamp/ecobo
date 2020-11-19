import styled from "styled-components/macro";
import {Link} from "react-router-dom";
import React from "react";
import GradientBorderlineTop from "./GradientBorderlineTop";
import GreenBoxSmall from "./GreenBoxSmall";

export default function TabBarWithOneLink({text, link}) {

    return(
        <>
            <StyledTabBar>
                <Link to={link}>{text}</Link>
            </StyledTabBar>
            <GradientBorderlineTop/>
            <GreenBoxSmall/>
        </>
    )

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