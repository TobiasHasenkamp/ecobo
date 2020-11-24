import styled from "styled-components/macro";
import React from "react";
import ShowsAsListIconButton from "./buttons/ShowsAsListIconButton";
import ShowAsMapIconButton from "./buttons/ShowAsMapIconButton";
import ShowAsCardsIconButton from "./buttons/ShowAsCardsIconButton"
import {useHistory} from "react-router-dom"

export default function TabBarWithIcons({type}) {

    const history = useHistory();

    function handleLinkToMap() {
            history.push("/bo/map");
    }

    function handleLinkToList() {
        history.push("/bo/list");
    }

    function handleLinkToCards() {
        history.push("/404");
    }


    return(
        <>
            <StyledTabBar>
                {(type !== "map") && <ShowAsMapIconButton handle={handleLinkToMap}/>}
                {(type !== "list") && <ShowsAsListIconButton handle={handleLinkToList}/>}
                {(type !== "cards") && <ShowAsCardsIconButton handle={handleLinkToCards}/>}
            </StyledTabBar>
        </>
    )

}


const StyledTabBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 7px 15px 3px 5px;
  line-height: 1.4em;
  font-size: 1.2em;
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