import PageHeader from "../PageHeader";
import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom";
import {LoginRequest, RegistrationRequest} from "../services/loginService";
import LoginTokenContext from "../contexts/LoginTokenContext";
import TabBarWithOneLink from "../designElements/TabBarWithOneLink";
import {StandardButton} from "../designElements/buttons/StandardButton";

export default function LoginPage() {

    const history = useHistory();
    const {setToken, setUsername, setPassword, setIsLoggedIn} = useContext(LoginTokenContext);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registrationUsername, setRegistrationUsername] = useState("");
    const [registrationPassword1, setRegistrationPassword1] = useState("");
    const [registrationPassword2, setRegistrationPassword2] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const [errorRegistration, setErrorRegistration] = useState("");


    useEffect(() => {
        if (errorRegistration === "Registrierung erfolgreich."){
            LoginRequest(registrationUsername, registrationPassword1)
                .then((data) => setToken(data))
                .then(() => setIsLoggedIn(true))
                .then(() => history.push("/loading"))
                .catch(() => setErrorLogin("Username oder Passwort falsch"));
        }
        // this error is wrong, adding other dependencies here will completely change the data flow on this page
        // eslint-disable-next-line
    }, [errorRegistration, history])


    function handleLogin(event){
        event.preventDefault();

        setUsername(loginUsername);
        setPassword(loginPassword);

        LoginRequest(loginUsername, loginPassword)
            .then((data) => setToken(data))
            .then(() => setIsLoggedIn(true))
            .then(() => history.push("/home"))
            .catch(() => setErrorLogin("Username oder Passwort falsch"));
    }


    function handleRegistration(event){
        event.preventDefault();

        //test if the entered usernames match each other
        if (registrationPassword1 !== registrationPassword2){
            setErrorRegistration("Passwörter passen nicht zueinander.")
        }
        else {
            RegistrationRequest(registrationUsername, registrationPassword1)
                .then((data) => setErrorRegistration(data))
        }
    }


    function handleUsernameChangeLogin(event) {
        setLoginUsername(event.target.value)
    }

    function handlePasswordChangeLogin(event) {
        setLoginPassword(event.target.value)
    }

    function handleUsernameChangeRegistration(event) {
        setRegistrationUsername(event.target.value)
    }

    function handlePasswordChange1Registration(event) {
        setRegistrationPassword1(event.target.value)
    }

    function handlePasswordChange2Registration(event) {
        setRegistrationPassword2(event.target.value)
    }

    return(

        <div>
            <PageHeader title="Login"/>

            <StyledLoginPageContent>

                <StyledForm onSubmit={handleLogin}>
                    <label htmlFor="username">Username </label>
                    <input type="text" name="username" value={loginUsername} onChange={handleUsernameChangeLogin}/>
                    <label htmlFor="password">Passwort </label>
                    <input type="password" name="password" value={loginPassword} onChange={handlePasswordChangeLogin}/>

                    <div>
                        <StandardButton onClick={handleLogin}>Login</StandardButton>
                    </div>
                </StyledForm>

                <p>{errorLogin}</p>

            </StyledLoginPageContent>

            <br/>

            <TabBarWithOneLink text="Noch keinen Account?" link="/bo/map" type="bold"/>

            <StyledLoginPageContent>

                <StyledForm onSubmit={handleRegistration}>
                    <label htmlFor="usernameNew">Username </label>
                    <input type="text" name="usernameNew" value={registrationUsername} onChange={handleUsernameChangeRegistration}/>
                    <label htmlFor="passwordNew1">Passwort </label>
                    <input type="password" name="passwordNew1" value={registrationPassword1} onChange={handlePasswordChange1Registration}/>
                    <label htmlFor="passwordNew2">Passwort wiederholen</label>
                    <input type="password" name="passwordNew2" value={registrationPassword2} onChange={handlePasswordChange2Registration}/>
                    <div>
                        <StandardButton>Registrierung</StandardButton>
                    </div>
                </StyledForm>

                <p>{errorRegistration}</p>

            </StyledLoginPageContent>

        </div>

    );
}


const StyledLoginPageContent = styled.div`
  margin: 8px;
`

const StyledForm = styled.form`
  margin: 15px;
  display: grid;
  grid-template-rows: min-content min-content  min-content;
  grid-template-columns: min-content auto;
  grid-gap: 20px 5px;
  
  label{
    font-weight: bold;
    padding: 6px 8px;
  }
  
  div {
    grid-column: span 2;
  }
`
