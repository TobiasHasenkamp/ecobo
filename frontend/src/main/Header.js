import styled from "styled-components/macro";
import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogin() {
        setIsLoggedIn(!isLoggedIn);
    }

    return (

        <StyledHeader>

            <Link to="/home">
                <p>Home</p>
            </Link>

            <p>Logo</p>

            {
                isLoggedIn ?
                    <Link to="/acc" onClick={() => handleLogin()}> <p>Konto</p> </Link> :
                    <Link to="/login" onClick={() => handleLogin()}> <p>Login</p> </Link>
            }


        </StyledHeader>

    );

}


const StyledHeader = styled.div`

  justify-items: center;
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: var(--darkgreen);
  color: var(--white);
  font-size: 1.2em;
  width: 100%;
`