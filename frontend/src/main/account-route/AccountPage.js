import React, {useContext, useEffect} from "react";
import styled from "styled-components/macro";
import GradientBorderlineBottom from "../designElements/GradientBorderlineBottom";
import GreenBoxMedium from "../designElements/GreenBoxMedium.js";
import GradientBorderlineTop from "../designElements/GradientBorderlineTop";
import {useHistory, useParams} from "react-router-dom";
import EditIconButton from "../designElements/buttons/EditIconButton";
import DeleteIconButton from "../designElements/buttons/DeleteIconButton";
import LoginContext from "../contexts/createContexts/LoginContext";
import {getUserData} from "../services/userDataService";
import EmptyDivToClosePage from "../designElements/EmptyDivToClosePage";
import EcoElementContext from "../contexts/createContexts/EcoElementContext";
import {getEcoElements} from "../services/ecoElementService";
import PageHeaderWithoutWhiteBorder from "../PageHeaderWithoutWhiteBorder";
import ImgUploadFunctionality from "../services/ImgUpload";
import {StandardButton} from "../designElements/buttons/StandardButton";

export default function AccountPage() {
    const {token, setToken, setUsername, setPassword, setIsLoggedIn} = useContext(LoginContext);
    const {userData, setUserData} = useContext(LoginContext);
    const {ecoElements, setEcoElements} = useContext(EcoElementContext);
    const history = useHistory();
    const {userNameParam} = useParams();


    //useEffects

    useEffect(() => {
        getUserData(userNameParam, token, setUserData);
    }, [userNameParam, token, setUserData])

    useEffect(() => {
        getEcoElements(token, setEcoElements);
    }, [token, setEcoElements]);


    //handles

    function handleLogoutButton() {
        setToken("");
        setUsername("");
        setPassword("");
        localStorage.removeItem("ACCESS_TOKEN");
        setIsLoggedIn(false);
        history.push("/home");
    }

    function handleEditButton() {
        history.push("/404");
        //not working yet
    }

    function handleDeleteButton() {
        history.push("/404");
        //not working yet
    }


    //return

    return(

        <>
            <PageHeaderWithoutWhiteBorder title="Konto"/>

            <ScrollSection>

                <TopUserSection>

                    <LeftSideBar>
                        <div/>
                            <PhotoSection>
                                {userData.profilePic? <UserPhoto src={userData.profilePic}/>
                                : <UserPhoto src="/profilePics/placeholder.webp"/>
                                }
                                <ImgUploadFunctionality type="userImmediate"/>
                            </PhotoSection>
                            <UserDataSection>
                                <h3>Angemeldet:</h3>
                                <div> {userData.registrationDateExternal} </div><br/>
                                <h3>Rolle:</h3>
                                <div>User</div><br/>
                            </UserDataSection>
                        <div/>
                    </LeftSideBar>


                    <RightUserSection>
                        <div>
                            <h3>Username:</h3>
                            <div> {userData.username} </div><br/>
                        </div>
                        <AccountButtonBar>
                            <EditIconButton handle={handleEditButton}/>
                            <DeleteIconButton size="medium" handle={handleDeleteButton}/>
                        </AccountButtonBar>
                            <StandardButton onClick={() => handleLogoutButton()}>Logout</StandardButton>
                    </RightUserSection>

                </TopUserSection>


                <GradientBorderlineTop/>
                <GreenBoxMedium/>
                <GradientBorderlineBottom/>

                <BottomSection>
                    {/*<h3>Verwaltete Seiten:</h3>
                    none<br/><br/>*/}
                    <h3>Angelegte Seiten:</h3>
                    <ul>
                        {ecoElements?.filter(element => (element.creator === userData.username)).map(element => (
                            <li key={element.id}>{element.name} ({element.dateCreatedExternal})</li>
                        ))}
                    </ul>

                </BottomSection>

                <EmptyDivToClosePage/><br/><br/>

            </ScrollSection>
            <br/>

        </>

    );
}


const ScrollSection = styled.section`
  overflow: scroll;

  @media (max-height:650px) {
      height: 72%;
  }
  
  @media (min-height:651px) {
      height: 77%;
  }
  
  @media (min-height:775px) {
      height: 80%;
  }
  
  @media (min-height:900px) {
      height: 90%;
  }
`

const TopUserSection = styled.section`
  display: grid;
  grid-template-columns: 30% 70%;
  height: auto;
`

const LeftSideBar = styled.section`
  display: grid;
  grid-template-rows: 5% 40% 50% 5%;
  background-color: var(--darkgreen);
  margin-bottom: -10px;
  padding-top: 25px;
  width: 100%;
`

const PhotoSection = styled.section`
  width: auto;
  overflow: hidden;
  align-self: center;
  background-color: var(--darkgreen);
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const UserPhoto = styled.img`
  margin: auto;
  display: block;
  width: 65%;
  border-radius: 50%;
  border: white solid 2px;
`

const UserDataSection = styled.section`
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

const RightUserSection = styled.section`
    margin: 7% 10%;
    line-height: 0.85em;
    font-size: 1.0em;
    color: var(--darkgrey);
    display: grid;
    grid-template-columns: 75% 25%;
    grid-gap: 30px 5px;
    
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

const BottomSection = styled.section`
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

const AccountButtonBar = styled.section`
  margin: 13px 5px 0 10px;
  display: flex;
  justify-content: space-between;
`