import PageHeader from "../PageHeader";
import React, {useContext, useState} from "react";
import styled from "styled-components/macro";
import IsLoggedInContext from "../contexts/IsLoggedInContext";
import {useHistory} from "react-router-dom";
import {LoginRequest} from "../controller/LoginController";
import LoginTokenContext from "../contexts/LoginTokenContext";

export default function LoginPage() {

    const history = useHistory();
    const {switchLoginStatus} = useContext(IsLoggedInContext);
    const {setToken, setUsername, setPassword} = useContext(LoginTokenContext);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event) {
        event.preventDefault();

        setUsername(loginUsername);
        setPassword(loginPassword);

        LoginRequest(loginUsername, loginPassword)
            .then((data) => setToken(data))
            .then(() => switchLoginStatus(true))
            .then(() => history.push("/home"))
            .catch(() => setError("Unknown username or password"));
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

                <StyledForm onSubmit={handleLogin}>
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" value={loginUsername} onChange={handleUsernameChange}/>
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" value={loginPassword} onChange={handlePasswordChange}/>

                    <div>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </StyledForm>

                <br/>
                <p>{error}</p>

            </StyledLoginPageContent>

        </div>

    );
}


const StyledLoginPageContent = styled.div`
  margin: 10px;
`

const StyledForm = styled.form`
  margin: 24px;
  display: grid;
  grid-template-rows: min-content min-content  min-content;
  grid-template-columns: min-content auto;
  grid-gap: 15px 5px;
  
  label{
    font-weight: bold;
    padding: 5px;
  }
  
  div {
    grid-column: span 2;
  }
`
