import PageHeader from "../PageHeader";
import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components/macro";
import GradientBorderlineBottom from "../designElements/GradientBorderlineBottom";
import GreenBoxMedium from "../designElements/GreenBoxMedium.js";
import GradientBorderlineTop from "../designElements/GradientBorderlineTop";
import {useHistory, useParams} from "react-router-dom";
import EditIconButtonMedium from "../designElements/buttons/EditIconButtonMedium";
import DeleteIconButtonMedium from "../designElements/buttons/DeleteIconButtonMedium";
import LoginTokenContext from "../contexts/LoginTokenContext";
import {getUserData} from "../services/userDataService";

export default function AccountPage() {
    const {token, setToken, setUsername, setPassword, setIsLoggedIn} = useContext(LoginTokenContext);
    const history = useHistory();
    const {userNameParam} = useParams();
    const [userData, setUserData] = useState({});


    useEffect(() => {
        getUserData(userNameParam, token, setUserData);
    }, [userNameParam, token])


    function handleEditButton() {
        history.push("/404");
    }

    function handleDeleteButton() {
        history.push("/404");
    }

    function handleLogoutButton() {
        setToken("");
        setUsername("");
        setPassword("");
        localStorage.clear();
        setIsLoggedIn(false);
        history.push("/home");
    }


    return(

        <div>
            <PageHeader title="Konto"/>

            <StyledUserSection>

                <StyledLeftBar>
                    <div/>
                        <StyledPhotoSection>
                            <StyledUserPhoto src="/profilePics/placeholder.webp"/>
                            <StyledEditPictureButton>Edit Picture</StyledEditPictureButton>
                        </StyledPhotoSection>
                        <StyledLeftBarText>
                            <h3>Angemeldet:</h3>
                            <div> {userData.registrationDateExternal} </div><br/>
                            <h3>Rolle:</h3>
                            <div>Administrator</div><br/>
                        </StyledLeftBarText>
                    <div/>
                </StyledLeftBar>

                <StyledRightBar>



                    <StyledGrid>

                    <div>
                        <h3>Username:</h3>
                        <div> {userData.username} </div><br/>
                    </div>

                    <StyledButtonBar>
                        <EditIconButtonMedium handle={handleEditButton}/>
                        {/*<FaCheck/>*/}
                        <DeleteIconButtonMedium handle={handleDeleteButton}/>
                    </StyledButtonBar>

                    </StyledGrid>

                    <h3>E-Mail:</h3>
                    <div><h4>beispiel@e-mail.de</h4></div><br/>
                    <h3>Geburtsdatum:</h3>
                    <div>xx.xx.19xx</div><br/><br/><br/>

                </StyledRightBar>

            </StyledUserSection>
            <GradientBorderlineTop/>
            <GreenBoxMedium/>
            <GradientBorderlineBottom/>

            <StyledSiteSection>

                <h3>Verwaltete Seiten:</h3>
                none<br/><br/>

                <h3>Angelegte Seiten:</h3>
                none

                <StyledLogoutButton onClick={() => handleLogoutButton()}>Logout</StyledLogoutButton>


            </StyledSiteSection>
        </div>

    );
}


const StyledUserSection = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  height: auto;
`

const StyledLeftBar = styled.div`
  display: grid;
  grid-template-rows: 5% 40% 50% 5%;
  background-color: var(--darkgreen);
  margin-top: -10px;
  margin-bottom: -10px;
  width: 100%;
`

const StyledUserPhoto = styled.img`
  margin: auto;
  display: block;
  width: 65%;
  border-radius: 50%;
  border: white solid 2px;
`
const StyledPhotoSection = styled.div`
  width: auto;
  overflow: hidden;
  align-self: center;
  background-color: var(--darkgreen);
  margin-top: -20px;
  margin-left: 10px;
  margin-right: 10px;
`

const StyledLeftBarText = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  color: white;
  font-size: 0.65em;
  line-height: 0.75em;
  h3{
      color: var(--lightgrey);
      font-size: 1em;
  }
  h3 + div {
    line-height: 0.5em;
  }
`

const StyledRightBar = styled.div`
    margin: 7% 10%;
    line-height: 0.85em;
    font-size: 1.0em;
    color: var(--darkgrey);
    
  h3{
      color: black;
      font-size: 0.8em;
  }
  h3 + div {
    line-height: 0.7em;
  }
  h4 {
    color: var(--darkgrey);
    line-height: 0;
    font-size: 0.75em;
    font-weight: normal;
    margin: 0;
  }
`

const StyledEditPictureButton = styled.div`
  color: white;
  padding-top: 7px;
  font-size: 0.7em;
  text-align: center;
`

const StyledLogoutButton = styled.button`
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

const StyledSiteSection = styled.div`
  margin: 25px 35px;
  font-size: 0.85em;
  
  h3 {
    font-size: 1.15em;
  }
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
`

const StyledButtonBar = styled.div`
  margin: 13px 5px 0 10px;
  display: flex;
  justify-content: space-between;
  ;
`