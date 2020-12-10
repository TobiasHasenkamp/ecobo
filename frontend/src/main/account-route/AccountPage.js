import React, {useContext, useEffect} from "react";
import styled from "styled-components/macro";
import GradientBorderlineBottom from "../designElements/GradientBorderlineBottom";
import GreenBoxMedium from "../designElements/GreenBoxMedium.js";
import GradientBorderlineTop from "../designElements/GradientBorderlineTop";
import {useHistory, useParams} from "react-router-dom";
import EditIconButtonMedium from "../designElements/buttons/EditIconButtonMedium";
import DeleteIconButtonMedium from "../designElements/buttons/DeleteIconButtonMedium";
import LoginTokenContext from "../contexts/LoginTokenContext";
import {getUserData} from "../services/userDataService";
import EmptyDivToClosePage from "../designElements/EmptyDivToClosePage";
import EcoElementContext from "../contexts/EcoElementContext";
import {getEcoElements} from "../services/ecoElementService";
import PageHeaderWithoutWhiteBorder from "../PageHeaderWithoutWhiteBorder";
import ImgUpload from "../services/ImgUpload";

export default function AccountPage() {
    const {token, setToken, setUsername, setPassword, setIsLoggedIn} = useContext(LoginTokenContext);
    const {ecoElements, setEcoElements} = useContext(EcoElementContext);
    const history = useHistory();
    const {userNameParam} = useParams();
    const {userData, setUserData} = useContext(LoginTokenContext);

    useEffect(() => {
        getUserData(userNameParam, token, setUserData);
    }, [userNameParam, token, setUserData])

    useEffect(() => {
        getEcoElements(token, setEcoElements);
    }, [token, setEcoElements]);


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

        <>
            <PageHeaderWithoutWhiteBorder title="Konto"/>

            <ScrollDiv>

                <StyledUserSection>

                    <StyledLeftBar>
                        <div/>
                            <StyledPhotoSection>
                                {userData.profilePic? <StyledUserPhoto src={userData.profilePic}/>
                                : <StyledUserPhoto src="/profilePics/placeholder.webp"/>
                                }
                                <ImgUpload type="userImmediate"/>
                            </StyledPhotoSection>
                            <StyledLeftBarText>
                                <h3>Angemeldet:</h3>
                                <div> {userData.registrationDateExternal} </div><br/>
                                <h3>Rolle:</h3>
                                <div>User</div><br/>
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

                            <StyledLogoutButton onClick={() => handleLogoutButton()}>Logout</StyledLogoutButton>

                        </StyledGrid>

                    </StyledRightBar>

                </StyledUserSection>
                <GradientBorderlineTop/>
                <GreenBoxMedium/>
                <GradientBorderlineBottom/>

                <StyledSiteSection>

                    <h3>Verwaltete Seiten:</h3>
                    none<br/><br/>

                    <h3>Angelegte Seiten:</h3>

                    <ul>
                        {ecoElements?.filter(element => (element.creator === userData.username)).map(element => (
                            <li key={element.id}>{element.name} ({element.dateCreatedExternal})</li>
                        ))}
                    </ul>

                </StyledSiteSection>
                <EmptyDivToClosePage/>
                <EmptyDivToClosePage/>
            </ScrollDiv>

        </>

    );
}

const ScrollDiv = styled.div`
  overflow: scroll;
  height: 100%;
`

const StyledUserSection = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  height: auto;
`

const StyledLeftBar = styled.div`
  display: grid;
  grid-template-rows: 5% 40% 50% 5%;
  background-color: var(--darkgreen);
  margin-bottom: -10px;
  padding-top: 25px;
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
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const StyledLeftBarText = styled.div`
  margin-left: 20px;
  margin-right: 8px;
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
      font-size: 0.9em;
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

const StyledLogoutButton = styled.button`
  justify-self: right;
  width: min-content;
  background-color: var(--grey);
  border: none;
  border-radius: 8%;
  color: var(--darkgrey);
  padding: 8px 15px;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin-right: 20px;
  grid-column: 1 / span2;
`

const StyledSiteSection = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  margin: 25px 35px;
  font-size: 0.85em;
  
  h3 {
    font-size: 1.15em;
  }
  
  ul {
    font-size: 0.95em;
    margin: 3px 10px;
    padding: 0 22px;
  }
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  grid-gap: 30px 5px;

`

const StyledButtonBar = styled.div`
  margin: 13px 5px 0 10px;
  display: flex;
  justify-content: space-between;
`