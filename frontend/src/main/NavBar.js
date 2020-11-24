import styled from "styled-components/macro";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import GradientBorderlineBottom from "./designElements/GradientBorderlineBottom";
import LoginTokenContext from "./contexts/LoginTokenContext";

export default function NavBar() {

    const {username, isLoggedIn} = useContext(LoginTokenContext);

    const linkToAccountPage = "/acc/" + username;

    return (

        <>
            <StyledNavBar>

                <Link to="/home">
                    <p>Home</p>
                </Link>

                <p>[Logo]</p>

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
  justify-items: center;
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: var(--darkgreen);
  color: var(--white);
  font-size: 1.2em;
  width: 100%;
`