import styled from "styled-components/macro";
import React from "react";
import NewsfeedComponent from "./NewsfeedComponent";
import GreenBoxSmall from "./designComponents/otherDesignObjects/GreenBoxSmall";
import {Link} from "react-router-dom";
import GradientBorderlineTop from "./designComponents/otherDesignObjects/GradientBorderlineTop";
import EmptyDivToClosePage from "./designComponents/otherDesignObjects/EmptyDivToClosePage";

export default function HomePage() {

    return(

        <>
            <ScrollDiv>
                <FlexDiv>
                    <HomeImage src="homePhoto1.jpg"/>
                </FlexDiv>
                <GradientBorderlineTop/>

                <GreenBoxSmall/>

                <HomePageMenu>
                    <StyledGreenColumn/>
                    <HomePageMenuSubElement>
                        <StyledImage src="/mapPicture.png" alt="Map picture" />
                        <div><Link to="/bo/map">Zur Karte</Link></div>
                    </HomePageMenuSubElement>
                    <StyledGreenColumn/>
                    <HomePageMenuSubElement>
                        <StyledImage src="/listImage.png" alt="Map picture" />
                        <div><Link to="/bo/list">Zur Liste</Link></div>
                    </HomePageMenuSubElement>
                    <StyledGreenColumn/>
                </HomePageMenu>

                <GreenBoxSmall/>
                <NewsfeedComponent/>
                <EmptyDivToClosePage type="small"/>

            </ScrollDiv>
        </>
    );
}


const HomeImage = styled.img`
  width: 100%;
  border-bottom: ghostwhite solid 4px;
  border-top: ghostwhite solid 4px;
  max-height: 250px;
  max-width: 450px;
  grid-gap: 0;
`

const HomePageMenu = styled.div`
  display: grid;
  grid-template-columns: 15px 1fr 15px 1fr 15px;
  background-color: var(--darkgreen);
  margin: 0;
  padding: 0;
`

const HomePageMenuSubElement = styled.div`
  height: 115px;
  //margin: 8px 8px 8px 8px;
  border: white solid 8px;
  border-radius: 4%;
  overflow: hidden;
  text-align: center;
  position: relative;
  background-color: white;
  
  div {
      color: var(--darkgrey);
      font-size: 1.5em;
      font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  
  a {
      color: var(--darkgrey);
      text-decoration: none;
      
      :hover {
          color: var(--darkgrey);
      }
      
      :active {
          color: var(--darkgrey);
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

const StyledGreenColumn = styled.div`
  background-color: var(--darkgreen);
  height: 131px;
`

const StyledImage = styled.img`
    height: 110%;
    width: 110%;
    opacity: 65%;
    overflow: hidden;
`