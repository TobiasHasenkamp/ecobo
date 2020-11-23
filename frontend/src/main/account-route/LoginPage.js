import PageHeader from "../PageHeader";
import React, {useContext, useState} from "react";
import styled from "styled-components/macro";
import IsLoggedInContext from "../contexts/IsLoggedInContext";
import {useHistory} from "react-router-dom";
import {LoginRequest} from "../controller/LoginController";
import LoginTokenContext from "../contexts/LoginTokenContext";
import TokenValidation from "./methods/tokenValidation";

export default function LoginPage() {

    const history = useHistory();
    const {switchLoginStatus} = useContext(IsLoggedInContext);
    const {token, setToken, username, setUsername, password, setPassword} = useContext(LoginTokenContext);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event) {
        event.preventDefault();

        setUsername(loginUsername);
        setPassword(loginPassword);

        if (TokenValidation(token, setToken, username, setUsername, password, setPassword)){
            LoginRequest(loginUsername, loginPassword)
                    .then((data) => setToken(data))
                    .then(() => switchLoginStatus(true))
                    .then(() => history.push("/home"))
                    .catch(() => setError("Unknown username or password"));
        }
    }


    function handleUsernameChange(event) {
        setLoginUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setLoginPassword(event.target.value)
    }

    return(

        <div>
            <PageHeader title="Login"/>

            <StyledLoginPageContent>
                <p>Login page</p>

                <form onSubmit={handleLogin}>
                    <label>Username <input type="text" name="username"
                                           value={loginUsername} onChange={handleUsernameChange}/>
                    </label>
                    <br/>
                    <br/>
                    <label>Password <input type="password" name="password"
                                           value={loginPassword} onChange={handlePasswordChange}/>
                    </label>
                    <StyledLoginButton/>
                </form>

                <br/>
                <p>{error}</p>

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