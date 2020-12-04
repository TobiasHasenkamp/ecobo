import styled from "styled-components/macro";
import React from "react";
import {Link} from "react-router-dom";
import GreenBoxLargeWithGradientBorderline from "./designElements/GreenBoxLargeWithGradientBorderline";

import NewsfeedComponent from "./NewsfeedComponent";
import EmptyDivToClosePage from "./designElements/EmptyDivToClosePage";

export default function HomePage() {

    return(

        <>
            <ScrollDiv>
                <FlexDiv>
                    <StyledHomeImage src="homePhoto1.jpg"/>
                </FlexDiv>
                <GreenBoxLargeWithGradientBorderline/>

                <StyledHomePageMenu>
                    <p><Link to="/bo/map">Eco Map Test!</Link></p>
                    {/*<p><Link to="/features">Features</Link></p>
                    <p><Link to="/infos">Hintergrundinfos</Link></p>*/}
                </StyledHomePageMenu>

                <NewsfeedComponent/>

                <EmptyDivToClosePage/>

            </ScrollDiv>


        </>

    );

}


const StyledHomeImage = styled.img`
  width: 100%;
  border-bottom: ghostwhite solid 4px;
  border-top: ghostwhite solid 4px;
  max-height: 250px;
  max-width: 450px;
`

const StyledHomePageMenu = styled.div`
  display: block;
  text-align: center;
  margin: 35px;
  
  p {
    color: black;
    margin: 14px;
    font-size: 1.5em;
    text-align: center;
    text-shadow: 0.6px 0.6px 0.3px var(--grey);
  }
  
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

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ScrollDiv = styled.div`
  overflow: scroll;
  height: 100%;
`

