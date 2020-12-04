import styled from "styled-components/macro";
import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import GradientBorderlineBottom from "./designElements/GradientBorderlineBottom";
import LoginTokenContext from "./contexts/LoginTokenContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useHistory} from "react-router-dom";

export default function NavBar() {

    const {username, isLoggedIn} = useContext(LoginTokenContext);
    const [menuStatusAndAnchor, setMenuStatusAndAnchor] = useState(null);
    const history = useHistory();

    const linkToAccountPage = "/acc/" + username;

    const handleClick = (event) => {
        setMenuStatusAndAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setMenuStatusAndAnchor(null);
    };

    function handleClickHome(){
        setMenuStatusAndAnchor(null);
        history.push("/home");
    }

    function handleClickMap(){
        setMenuStatusAndAnchor(null);
        history.push("/bo/map");
    }

    function handleClickList(){
        setMenuStatusAndAnchor(null);
        history.push("/bo/list");
    }

    function handleClickGallery(){
        setMenuStatusAndAnchor(null);
        history.push("/404");
    }

    return (

        <>
            <StyledNavBar>

                <p onClick={handleClick}>Menü </p>

                <Menu
                    id="mainMenu"
                    anchorEl={menuStatusAndAnchor}
                    keepMounted
                    open={Boolean(menuStatusAndAnchor)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClickHome}>Home</MenuItem>
                    <MenuItem onClick={handleClickMap}>Karte</MenuItem>
                    <MenuItem onClick={handleClickList}>Liste</MenuItem>
                    <MenuItem onClick={handleClickGallery}>Galerie</MenuItem>
                </Menu>

                <p>   </p>

                {
                    isLoggedIn ?
                        <Link to={linkToAccountPage}> <p>Konto</p> </Link> :
                        <Link to="/login"> <p>Login</p> </Link>
                }


            </StyledNavBar>
            <GradientBorderlineBottom/>
        </>

    );

}

const StyledNavBar = styled.div`
  position: fixed;
  top: 0;
  justify-items: center;
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: var(--darkgreen);
  color: var(--white);
  font-size: 1.2em;
  width: 100%;
  height: 61px;
  
  .menuItem{
      color: black;
      
      :active{
        color: black;
      }
      
      :hover{
        color: black;
      }
  }
`