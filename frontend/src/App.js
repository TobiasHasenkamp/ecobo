import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./main/HomePage";
import AccountPage from "./main/account-route/AccountPage";
import BackgroundInfoPage from "./main/BackgroundInfoPage";
import FeaturePage from "./main/FeaturePage";
import ListPage from "./main/ListPage";
import AddElementPage from "./main/list-route/AddElementPage";
import MapPage from "./main/MapPage";
import NavBar from "./main/NavBar";
import LoginPage from "./main/account-route/LoginPage";
import "./App.css";
import UnderConstructionPage from "./main/UnderConstructionPage";
import EcoElementContextProvider from "./main/contexts/EcoElementContextProvider";
import LoginTokenContextProvider from "./main/contexts/LoginTokenContextProvider";
import styled from "styled-components/macro";
import LoadingPage from "./main/LoadingPage";
import EcoElementPage from "./main/list-route/EcoElementPage";
import EditElementPage from "./main/list-route/EditElementPage";
import DeletePage from "./main/list-route/DeletePage";
import NewsfeedContextProvider from "./main/contexts/NewsfeedContextProvider";


function App() {

  return (

      <LoginTokenContextProvider> <EcoElementContextProvider> <NewsfeedContextProvider>

          <StyledPageLayout>
              <Switch>

                  <Route path="/bo/map">
                      <NavBar/>
                      <MapPage/>
                  </Route>
                  <Route path="/bo/map/centered">
                      <NavBar/>
                      <MapPage/>
                  </Route>
                  <Route path="/bo/list">
                      <NavBar/>
                      <ListPage/>
                  </Route>
                  <Route path="/bo/addElement">
                      <NavBar/>
                      <AddElementPage/>
                  </Route>
                  <Route path="/bo/editElement/:ecoElementIDParam">
                      <NavBar/>
                      <EditElementPage/>
                  </Route>
                  <Route path="/bo/deleteElement/:ecoElementIDParam">
                      <NavBar/>
                      <DeletePage/>
                  </Route>
                  <Route path="/bo/element/:ecoElementIDParam">
                      <NavBar/>
                      <EcoElementPage/>
                  </Route>
                  <Route path="/acc/:userNameParam">
                      <NavBar/>
                      <AccountPage/>
                  </Route>
                  <Route path="/infos">
                      <NavBar/>
                      <BackgroundInfoPage/>
                  </Route>
                  <Route path="/features">
                      <NavBar/>
                      <FeaturePage/>
                  </Route>
                  <Route path="/home">
                      <NavBar/>
                      <HomePage/>
                  </Route>
                  <Route path="/login">
                      <NavBar/>
                      <LoginPage/>
                  </Route>
                  <Route exact path="/loading">
                      <NavBar/>
                      <LoadingPage/>
                  </Route>
                  <Route path="/loading/map">
                      <NavBar/>
                      <LoadingPage/>
                  </Route>
                  <Route path="/404">
                      <NavBar/>
                      <UnderConstructionPage/>
                  </Route>
                  <Route path="/">
                      <Redirect to="/home"/>
                  </Route>

              </Switch>

        </StyledPageLayout>

      </NewsfeedContextProvider> </EcoElementContextProvider> </LoginTokenContextProvider>

  );
}


export default App;


const StyledPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
`