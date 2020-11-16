import styled from "styled-components/macro";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import GradientBorderlineBottom from "./designElements/GradientBorderlineBottom";
import IsLoggedInContext from "./contexts/IsLoggedInContext";

export default function NavBar() {


    const {isLoggedIn} = useContext(IsLoggedInContext);

    return (

        <>
            <StyledNavBar>

                <Link to="/home">
                    <p>Home</p>
                </Link>

                <p>[Logo]</p>

                {
                    isLoggedIn ?
                        <Link to="/acc"> <p>Konto</p> </Link> :
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