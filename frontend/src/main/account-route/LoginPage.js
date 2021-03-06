import PageHeader from "../designComponents/otherDesignObjects/PageHeader";
import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom";
import {LoginRequest, RegistrationRequest} from "../services/loginService";
import LoginContext from "../contexts/createContexts/LoginContext";
import SmallHeaderBar from "../designComponents/otherDesignObjects/SmallHeaderBar";
import {StandardButton} from "../designComponents/buttons/StandardButton";
import EmptyDivToClosePage from "../designComponents/otherDesignObjects/EmptyDivToClosePage";

export default function LoginPage() {

    const history = useHistory();
    const {setToken, setUsername, setPassword, setIsLoggedIn} = useContext(LoginContext);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registrationUsername, setRegistrationUsername] = useState("");
    const [registrationPassword1, setRegistrationPassword1] = useState("");
    const [registrationPassword2, setRegistrationPassword2] = useState("");
    const [registrationEmail, setRegistrationEmail] = useState("");
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
        // React wants me to add registrationPassword1, registrationUsername, history, setIsLoggedIn and setToken as dependencies.
        // But this error is wrong, adding other dependencies here will completely change the data flow on this page.
        //This useEffect should only fire, when the registration request gets answered.
        // eslint-disable-next-line
    }, [errorRegistration])


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
        if (registrationPassword1 !== registrationPassword2){
            setErrorRegistration("Passwörter passen nicht zueinander.")
        } else {
            RegistrationRequest(registrationUsername, registrationPassword1, registrationEmail)
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
    function handleEmailChangeRegistration(event) {
        setRegistrationEmail(event.target.value)
    }

    return(

        <>
            <PageHeader title="Login"/>

            <ScrollSection>
                <SectionLayout>
                    <LoginAndRegistrationForm onSubmit={handleLogin}>
                        <label htmlFor="username">Username </label>
                        <input type="text" name="username" value={loginUsername} onChange={handleUsernameChangeLogin}/>
                        <label htmlFor="password">Passwort </label>
                        <input type="password" name="password" value={loginPassword} onChange={handlePasswordChangeLogin}/>
                        <div>
                            <StandardButton onClick={handleLogin}>Login</StandardButton>
                        </div>
                    </LoginAndRegistrationForm>
                    <p>{errorLogin}</p>
                </SectionLayout>

                <br/>

                <SmallHeaderBar text="Noch keinen Account?"/>

                <SectionLayout>
                    <LoginAndRegistrationForm onSubmit={handleRegistration}>
                        <label htmlFor="usernameNew">Username </label>
                        <input type="text" name="usernameNew" value={registrationUsername} onChange={handleUsernameChangeRegistration}/>
                        <label htmlFor="passwordNew1">Passwort </label>
                        <input type="password" name="passwordNew1" value={registrationPassword1} onChange={handlePasswordChange1Registration}/>
                        <label htmlFor="passwordNew2">Passwort wiederholen</label>
                        <input type="password" name="passwordNew2" value={registrationPassword2} onChange={handlePasswordChange2Registration}/>
                        <label htmlFor="emailNew">E-Mail</label>
                        <input type="text" name="emailNew" value={registrationEmail} onChange={handleEmailChangeRegistration}/>
                        <div>
                            <StandardButton>Registrierung</StandardButton>
                        </div>
                    </LoginAndRegistrationForm>
                    <p>{errorRegistration}</p>
                    <EmptyDivToClosePage type="very_large"/>

                </SectionLayout>

            </ScrollSection>
        </>
    );
}

const ScrollSection = styled.section`
  overflow: scroll;
  height: 100%;
`

const SectionLayout = styled.section`
  margin: 8px;
`

const LoginAndRegistrationForm = styled.form`
  margin: 15px;
  display: grid;
  grid-template-rows: min-content min-content min-content;
  grid-template-columns: min-content auto;
  grid-gap: 20px 6px;
  
  @media (max-width:315px) {
      grid-template-columns: 45% 55%;
  }
  
  label{
    font-weight: bold;
    padding: 6px 8px;
  }
  
  div {
    grid-column: span 2;
  }
`
