import PageHeader from "../PageHeader";
import React from "react";
import styled from "styled-components/macro";
import GradientBorderlineBottom from "../designElements/GradientBorderlineBottom";
import GreenBoxMedium from "../designElements/GreenBoxMedium.js";
import GradientBorderlineTop from "../designElements/GradientBorderlineTop";

export default function AccountPage() {

    return(

        <div>
            <PageHeader title="Konto"/>

            <StyledUserSection>

                <StyledLeftBar>
                    <div/>
                        <StyledPhotoSection>
                            <StyledUserPhoto src="/profilePics/tobiashasenkamp.png"/>
                            <StyledEditPictureButton>Edit Picture</StyledEditPictureButton>
                        </StyledPhotoSection>
                        <StyledLeftBarText>
                            <h3>Angemeldet:</h3>
                            <div>16.11.2020</div><br/>
                            <h3>Rolle:</h3>
                            <div>Administrator</div><br/>
                            <h3>Registriert über:</h3>
                            <div>Github</div>
                        </StyledLeftBarText>
                    <div/>
                </StyledLeftBar>

                <StyledRightBar>
                    <h3>Username:</h3>
                    <div>TobiasHasenkamp</div><br/>
                    <h3>E-Mail:</h3>
                    <div><h4>tobias.hasenkamp@googlemail.com</h4></div><br/>
                    <h3>Geburtsdatum:</h3>
                    <div>20.10.1990</div><br/><br/><br/>

                    <StyledButton>Edit</StyledButton>
                    <StyledButton>Delete</StyledButton>

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

                <StyledLogoutButton>Logout</StyledLogoutButton>


            </StyledSiteSection>
        </div>

    );
}


const StyledUserSection = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  height: 32vh;
`

const StyledLeftBar = styled.div`
  display: grid;
  padding: 15px 0;
  grid-template-rows: 5% 40% 50% 5%;
  background-color: var(--darkgreen);
  margin-top: -10px;
  margin-bottoM: -10px;
`

const StyledUserPhoto = styled.img`
  margin: auto;
  display: block;
  max-width: 60%;
  max-height: 60%;
  border-radius: 50%;
  border: white solid 2px;
`
const StyledPhotoSection = styled.div`
  overflow: hidden;
  align-self: center;
  background-color: var(--darkgreen);
  margin-top: -30px;
`

const StyledLeftBarText = styled.div`
  margin-left: 6px;
  color: white;
  padding: 0 12px;
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
  margin: 3% 10%;
    line-height: 0.85em;
    font-size: 0.8em;
    color: var(--darkgrey);
  h3{
      color: black;
      font-size: 1em;
  }
  h3 + div {
    line-height: 0.5em;
  }
  h4 {
    color: var(--darkgrey);
    line-height: 0;
    font-size: 0.85em;
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

const StyledButton = styled.button`
  min-width: 30%;
  background-color: var(--grey);
  border: none;
  border-radius: 8%;
  color: var(--darkgrey);
  padding: 7px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 0.9em;
  font-weight: bolder;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin-right: 8px;
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