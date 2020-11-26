import styled from "styled-components/macro";
import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import GreenBoxLargeWithGradientBorderline from "./designElements/GreenBoxLargeWithGradientBorderline";
import NewsfeedContext from "./contexts/NewsfeedContext";
import {getNewsfeed5} from "./services/NewsfeedService";
import LoginTokenContext from "./contexts/LoginTokenContext";
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import {FaFontAwesome} from "react-icons/all";

export default function HomePage() {

    const {token} = useContext(LoginTokenContext);
    const {newsfeed5, setNewsfeed5} = useContext(NewsfeedContext);

    useEffect(() => {
        getNewsfeed5(token, setNewsfeed5);
    }, [])

    useEffect(() => {
       console.log(newsfeed5);
    }, [newsfeed5])


    return(

        <>

            <FlexDiv>
                <StyledHomeImage src="homePhoto1.jpg"/>
            </FlexDiv>
            <GreenBoxLargeWithGradientBorderline/>

            <StyledHomePageMenu>
                <p><Link to="/bo/map">Eco Map</Link></p>
                {/*<p><Link to="/features">Features</Link></p>
                <p><Link to="/infos">Hintergrundinfos</Link></p>*/}
            </StyledHomePageMenu>

            <StyledNewsfeed className="fa-ul">

                {newsfeed5.map((newsfeedElement) => <li key={newsfeedElement.id} >
                                                            <FaFontAwesome icon={faCheckSquare} listItem/>
                                                                {newsfeedElement.dateExternal}:
                                                                {newsfeedElement.message}
                                                    </li>)}

            </StyledNewsfeed>

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

const StyledNewsfeed = styled.ul`
  width: auto;
  margin: 15px;
  list-style-type: circle;
  font-size: 0.70em;
  border-left: 5px solid var(--darkgreen);
  padding: 10px 20px;

  li{
    margin: 3px;
  }

`