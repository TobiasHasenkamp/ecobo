import styled from "styled-components/macro";
import React from "react";
import {Link} from "react-router-dom";

export default function HomePage() {

    return(

        <div>

            <StyledDarkGradientLineTop/>
            <FlexDiv>
                <StyledHomeImage src="homePhoto1.jpg"/>
            </FlexDiv>
            <StyledDarkGradientLineBottom/>
            <StyledDarkGreenBox/>

            <StyledHomePageMenu>
                <p><Link to="/bo/map">Eco Map</Link></p>
                <p><Link to="/features">Features</Link></p>
                <p><Link to="/infos">Hintergrundinfos</Link></p>
            </StyledHomePageMenu>

        </div>

    );

}


const StyledHomeImage = styled.img`
  width: 100%;
  border-bottom: ghostwhite solid 4px;
  border-top: ghostwhite solid 4px;
  max-height: 250px;
  max-width: 450px;
`

const StyledDarkGreenBox = styled.div`
  display: block;
  width: 100%;
  background-color: var(--darkgreen);
  height: 35px;
`

const StyledDarkGradientLineBottom = styled.div`
  display: block;
  width: 100%;
  height: 7px;
  background-image: linear-gradient(ghostwhite, var(--grey));
`

const StyledDarkGradientLineTop = styled.div`
  display: block;
  width: 100%;
  height: 7px;
  background-image: linear-gradient(var(--grey), ghostwhite);
`

const StyledHomePageMenu = styled.div`
  display: block;
  text-align: center;
  margin: 35px;
  
  p {
    //color: var(--darkgreen);
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