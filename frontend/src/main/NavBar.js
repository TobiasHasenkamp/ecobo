import styled from "styled-components/macro";
import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import GradientBorderlineBottom from "./designComponents/otherDesignObjects/GradientBorderlineBottom";
import LoginContext from "./contexts/createContexts/LoginContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useHistory} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";
import {FiUser} from "react-icons/fi";
import {CgLogIn} from "react-icons/cg";

export default function NavBar() {

    const {username, isLoggedIn} = useContext(LoginContext);
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

                <StyledNavBarButton onClick={handleClick}><GiHamburgerMenu/>
                    <StyledNavBarText>Menü</StyledNavBarText>
                </StyledNavBarButton>

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

                <div/>

                {
                    isLoggedIn ?
                        <Link to={linkToAccountPage} style={{margin:"auto"}}>
                            <StyledNavBarButton><FiUser/>
                                <StyledNavBarText style={{marginLeft: "6px"}}>Konto</StyledNavBarText>
                            </StyledNavBarButton>
                        </Link> :
                        <Link to="/login" style={{margin:"auto"}}>
                            <StyledNavBarButton><CgLogIn/>
                                <StyledNavBarText style={{marginLeft: "7px"}}>Login</StyledNavBarText>
                            </StyledNavBarButton>
                        </Link>
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
  max-width: 450px;
  
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

const StyledNavBarButton = styled.div`
  font-size: 1.4em;
  display: grid;
  grid-template-columns: auto auto;
  margin: auto;
`

const StyledNavBarText = styled.div`
  font-size: 0.78em;
  margin-left: 10px;
  margin-top: 3px;
`