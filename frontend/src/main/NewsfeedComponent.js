import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {FaCheck, FaQuestion, FaWarehouse} from "react-icons/fa";
import ListItemText from "@material-ui/core/ListItemText";
import {AiOutlineCheckCircle} from "react-icons/ai";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import React, {useContext, useEffect} from "react";
import styled from "styled-components/macro";
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import NewsfeedContext from "./contexts/NewsfeedContext";
import {getNewsfeed5} from "./services/NewsfeedService";
import LoginTokenContext from "./contexts/LoginTokenContext";
import {Link} from "react-router-dom";
import {BiMessageAltDetail, FiDelete, GrUpdate, GrUserAdd} from "react-icons/all";

export default function NewsfeedComponent(){

    const {newsfeed5, setNewsfeed5} = useContext(NewsfeedContext);

    useEffect(() => {
        getNewsfeed5(token, setNewsfeed5);
    }, [])

    useEffect(() => {
        console.log(newsfeed5);
    }, [newsfeed5])

    const {token} = useContext(LoginTokenContext);


    function getDateDifference(dateInternal){

        const today = new Date();
        const date = new Date(dateInternal);
        const daysPassed = (today - date) / (1000 * 60 * 60 *24);

        if (daysPassed < 0.9){
            return "vor " + (Math.round(daysPassed * 24)) + "h"
        }
        else if (daysPassed < 25){
            return "vor " + (Math.round(daysPassed)) + " Tagen"
        }
        else if (daysPassed < 340){
            return "vor " + (Math.round(daysPassed/30)) + " Monaten"
        }
        else {
            return "vor " + (Math.round(daysPassed/365)) + " Jahren"
        }
    }

    return (

        <StyledNewsfeed>

            {newsfeed5.map((newsfeedElement) => (

                <Link key={newsfeedElement.id} to={"/bo/element/" + newsfeedElement.linkedElement}>
                    <div className="row">
                        {newsfeedElement.type === "ECOELEMENT_ADDED" && <FaWarehouse/>}
                        {newsfeedElement.type === "ECOELEMENT_UPDATED" && <GrUpdate/>}
                        {newsfeedElement.type === "ECOELEMENT_DELETED" && <FiDelete/>}
                        {newsfeedElement.type === "ECOELEMENT_REVIEWED" && <FaCheck/>}
                        {newsfeedElement.type === "ECOELEMENT_IN_DELETE_PROCESS" && <FaQuestion/>}
                        {newsfeedElement.type === "USER_REGISTRATION" && <GrUserAdd/>}
                        {newsfeedElement.type === "ADMIN_MESSAGE" && <BiMessageAltDetail/>}
                        {newsfeedElement.type === "NONE" && <BiMessageAltDetail/>}
                        <div>{getDateDifference(newsfeedElement.dateInternal)}</div>
                        <div>{newsfeedElement.message.slice(0, 28)}</div>
                    </div>
                </Link>

                ))
            }

        </StyledNewsfeed>

        )
}


const StyledNewsfeed = styled.div`
  width: auto;
  margin: 15px;
  font-size: 0.8em;
  border-left: 5px solid var(--darkgreen);
  padding: 10px 20px;
  list-style: none;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  background-color: lightgray;
  
  a{
      color: var(--darkgrey);
      
      :active{
        color: black;
      }
  }

  .row{
        display: grid;
        grid-template-columns: min-content auto auto;
        grid-gap: 15px;
  }
  
   
`