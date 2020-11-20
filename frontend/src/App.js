import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./main/HomePage";
import AccountPage from "./main/account-route/AccountPage";
import BackgroundInfoPage from "./main/BackgroundInfoPage";
import FeaturePage from "./main/FeaturePage";
import ListPage from "./main/ListPage";
import AddElementPage from "./main/ecoElement-route/AddElementPage";
import MapPage from "./main/MapPage";
import NavBar from "./main/NavBar";
import LoginPage from "./main/account-route/LoginPage";
import "./App.css";
import UnderConstructionPage from "./main/UnderConstructionPage";
import IsLoggedInContextProvider from "./main/contexts/IsLoggedInContextProvider";
import EcoElementContextProvider from "./main/contexts/EcoElementContextProvider";
import LoginTokenContextProvider from "./main/contexts/LoginTokenContextProvider";


function App() {

  return (

      <LoginTokenContextProvider><IsLoggedInContextProvider> <EcoElementContextProvider>

          <Switch>

              <Route path="/bo/map">
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
              <Route path="/acc">
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
              <Route path="/404">
                  <NavBar/>
                  <UnderConstructionPage/>
              </Route>
              <Route path="/">
                  <Redirect to="/home"/>
              </Route>

          </Switch>

      </EcoElementContextProvider> </IsLoggedInContextProvider></LoginTokenContextProvider>

  );
}


export default App;