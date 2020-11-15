import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./main/HomePage";
import AccountPage from "./main/AccountPage";
import BackgroundInfoPage from "./main/BackgroundInfoPage";
import FeaturePage from "./main/FeaturePage";
import ListPage from "./main/ListPage";
import MapPage from "./main/MapPage";
import Header from "./main/Header";
import LoginPage from "./main/account-route/LoginPage";


function App() {

  return (

      <Switch>

          <Route path="/bo/map">
              <Header/>
              <MapPage/>
          </Route>
          <Route path="/bo/list">
              <Header/>
              <ListPage/>
          </Route>
          <Route path="/acc">
              <Header/>
              <AccountPage/>
          </Route>
          <Route path="/infos">
              <Header/>
              <BackgroundInfoPage/>
          </Route>
          <Route path="/features">
              <Header/>
              <FeaturePage/>
          </Route>
          <Route path="/home">
              <Header/>
              <HomePage/>
          </Route>
          <Route path="/login">
              <Header/>
              <LoginPage/>
          </Route>
          <Route path="/">
              <Redirect to="/home"/>
          </Route>


      </Switch>




  );
}


export default App;
