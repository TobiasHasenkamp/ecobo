import {FaCheck, FaQuestion, FaWarehouse} from "react-icons/fa";
import React, {useContext, useEffect} from "react";
import styled from "styled-components/macro";
import NewsfeedContext from "./contexts/NewsfeedContext";
import {getNewsfeed50} from "./services/NewsfeedService";
import LoginTokenContext from "./contexts/LoginTokenContext";
import {Link} from "react-router-dom";
import {BiMessageAltDetail, FiDelete, GrUpdate, GrUserAdd} from "react-icons/all";
import EcoElementContext from "./contexts/EcoElementContext";
import {getEcoElements} from "./services/EcoElementService";
import {FaRegArrowAltCircleDown} from "react-icons/fa";

export default function NewsfeedPage(){

    const {ecoElements, setEcoElements} = useContext(EcoElementContext);
    const {newsfeed50, setNewsfeed50} = useContext(NewsfeedContext);
    const {token} = useContext(LoginTokenContext);

    useEffect(() => {
        getEcoElements(token, setEcoElements);
    }, [token, setEcoElements]);


    useEffect(() => {
        if (token && ecoElements){
            getNewsfeed50(token, setNewsfeed50);
        }
    }, [setNewsfeed50, ecoElements, token])


    function getLink(newsfeedElementForLink){

        if (ecoElements !== undefined && newsfeedElementForLink !== undefined) {

            const newsfeedType = newsfeedElementForLink.type;

            if (newsfeedType === "USER_REGISTRATION") {
                return "/home";
            } else if (newsfeedType === "ADMIN_MESSAGE") {
                return "/home";
            } else if (newsfeedType === "NONE") {
                return "/home";
            } else {
                return "/bo/element/" + newsfeedElementForLink.linkedElement;
            }
        }
    }

    function getDateDifference(dateInternal){

        const today = new Date();
        const date = new Date(dateInternal);
        const daysPassed = (today - date) / (1000 * 60 * 60 *24);


        if (daysPassed < 0.04){
            if (Math.round(daysPassed * 24 * 60) < 2){
                return "jetzt";
            }
            else {
                return "vor " + (Math.round(daysPassed * 24 * 60)) + "min";
            }
        }
        else if (daysPassed < 0.9){
            return "vor " + (Math.round(daysPassed * 24)) + "h";
        }
        else if (daysPassed < 25){
            if (Math.round(daysPassed) === 1){
                return "vor " + (Math.round(daysPassed)) + " Tag";
            }
            else {
                return "vor " + (Math.round(daysPassed)) + " Tagen";
            }
        }
        else if (daysPassed < 340){
            if (Math.round(daysPassed/30) === 1){
                return "vor " + (Math.round(daysPassed/30)) + " Monat";
            }
            else {
                return "vor " + (Math.round(daysPassed/30)) + " Monaten";
            }
        }
        else {
            if (Math.round(daysPassed/365) === 1){
                return "vor " + (Math.round(daysPassed/365)) + " Jahr";
            }
            else {
                return "vor " + (Math.round(daysPassed/365)) + " Jahren";
            }
        }
    }

    function returnIcon(newsfeedType){

        if (newsfeedType === "ECOELEMENT_ADDED"){
            return <FaWarehouse/>
        }
        else if (newsfeedType === "ECOELEMENT_UPDATED"){
            return <GrUpdate/>
        }
        else if (newsfeedType === "ECOELEMENT_DELETED"){
            return <FiDelete/>
        }
        else if (newsfeedType === "ECOELEMENT_REVIEWED"){
            return <FaCheck/>
        }
        else if (newsfeedType === "ECOELEMENT_IN_DELETE_PROCESS"){
            return <FaQuestion/>
        }
        else if (newsfeedType === "USER_REGISTRATION"){
            return <GrUserAdd/>
        }
        else if (newsfeedType === "ADMIN_MESSAGE"){
            return <BiMessageAltDetail/>
        }
        else {
            return <BiMessageAltDetail/>
        }
    }

    return (


        <div>
            <StyledNewsfeedHeader>Newsfeed:</StyledNewsfeedHeader>
            <StyledNewsfeed>
                {newsfeed50.map((newsfeedElement) => (
                    <Link key={newsfeedElement.id} to={getLink(newsfeedElement)}>
                        <div className="row">
                            {returnIcon(newsfeedElement.type)}
                            <div>{getDateDifference(newsfeedElement.dateInternal)}</div>
                            <div>{newsfeedElement.message.slice(0, 40)}</div>
                        </div>
                    </Link>

                ))
                }
            </StyledNewsfeed>
        </div>


    )
}


const StyledNewsfeed = styled.div`
  overflow: scroll;
  width: auto;
  margin: 0 15px 15px 15px;
  font-size: 0.8em;
  font-size: 3.1vmin;
  border-left: 5px solid var(--darkgreen);
  padding: 10px 14px 6px 14px;
  display: grid;
  grid-template-rows: min-content min-content min-content min-content min-content;
  grid-gap: 4px;
  background-color: lightgray;
  
  a{
      color: var(--darkgrey);
      :active{
        color: var(--darkgrey);
      }
      :hover{
        color: var(--darkgrey);
      }
  }

  .row{
        display: grid;
        grid-template-columns: min-content minmax(min-content, 25%) minmax(min-content, 78%);
        grid-gap: 13px;
        justify-content: left;
        padding: 2px 0;
  } 
`

const StyledNewsfeedHeader = styled.div`
  width: auto;
  margin: 15px 15px 0 15px;
  padding: 10px 14px 7px 10px;
  font-size: 1.0em;
  font-weight: bold;
  color: var(--darkgrey);
`