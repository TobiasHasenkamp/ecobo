import PageHeader from "../PageHeader";
import React, {useContext} from "react";
import styled from "styled-components/macro";
import IsLoggedInContext from "../contexts/IsLoggedInContext";
import {useHistory} from "react-router-dom";

export default function LoginPage() {

    const history = useHistory();
    const {switchLoginStatus} = useContext(IsLoggedInContext);

    function handleLoginButton() {
        switchLoginStatus(true);
        history.push("/home")
    }

    return(

        <div>
            <PageHeader title="Login"/>

            <StyledLoginPageContent>
                <p>Login page</p>

                <StyledLoginButton onClick={() => handleLoginButton()}>Login</StyledLoginButton>

            </StyledLoginPageContent>

        </div>

    );
}


const StyledLoginPageContent = styled.div`
  margin: 10px;
`

const StyledLoginButton = styled.button`
  position: fixed;
  bottom: 5vh;
  right: 5vh;
  min-width: 30%;
  background-color: var(--grey);
  border: none;
  border-radius: 8%;
  color: var(--darkgrey);
  padding: 7px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bolder;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin-right: 8px;
`