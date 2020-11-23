import PageHeader from "../PageHeader";
import React, {useContext, useState} from "react";
import styled from "styled-components/macro";
import IsLoggedInContext from "../contexts/IsLoggedInContext";
import {useHistory} from "react-router-dom";
import {LoginRequest} from "../services/LoginService";
import LoginTokenContext from "../contexts/LoginTokenContext";
import TabBarWithOneLink from "../designElements/TabBarWithOneLink";
import GreenBoxSmall from "../designElements/GreenBoxSmall";

export default function LoginPage() {

    const history = useHistory();
    const {switchLoginStatus} = useContext(IsLoggedInContext);
    const {setToken, setUsername, setPassword} = useContext(LoginTokenContext);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registrationUsername, setRegistrationUsername] = useState("");
    const [registrationPassword1, setRegistrationPassword1] = useState("");
    const [registrationPassword2, setRegistrationPassword2] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event){
        event.preventDefault();

        setUsername(loginUsername);
        setPassword(loginPassword);

        LoginRequest(loginUsername, loginPassword)
            .then((data) => setToken(data))
            .then(() => switchLoginStatus(true))
            .then(() => history.push("/home"))
            .catch(() => setError("Unknown username or password"));
    }


    function handleRegistration(event){
        event.preventDefault();
        console.log("Registration triggered");
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
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </StyledForm>

                <br/> <br/>

                <GreenBoxSmall/>
                <TabBarWithOneLink text="Noch keinen Account?" link="/bo/map"/>
                <br/>
                <div> <strong>Registrierung</strong></div>

                <StyledForm onSubmit={handleRegistration}>
                    <label htmlFor="usernameNew">Username </label>
                    <input type="text" name="usernameNew" value={registrationUsername} onChange={handleUsernameChangeRegistration}/>
                    <label htmlFor="passwordNew1">Passwort </label>
                    <input type="password" name="passwordNew1" value={registrationPassword1} onChange={handlePasswordChange1Registration}/>
                    <label htmlFor="passwordNew2">Passwort wiederholen</label>
                    <input type="password" name="passwordNew2" value={registrationPassword2} onChange={handlePasswordChange2Registration}/>

                    <div>
                        <button>Registration</button>
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
