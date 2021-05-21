import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/home.js'
import Login from './components/Login/login'
import useToken from './useToken'
import Header from './components/Header/header'
import Chart from './components/Chart/chart'
import Footer from './components/Footer/footer'
import Register from './components/Register/register'
import Page404 from './components/Page404/Page404'
import Page500 from './components/Page500/Page500'
import AddHouse from './components/AddHouse/addHouse'
import jwt_decode from "jwt-decode";
import ListHouse from './components/ListHouse/listHouse'
import EditHouse from './components/EditHouse/editHouse'
import Menu from './components/SideMenu/sideMenu'
class App extends React.Component {
  constructor(props) {
    super(props)
    let token = localStorage.getItem('accessToken');
    let user = null
    if (token) {
      try {
        user = jwt_decode(token)
      } catch (err) {
        console.log(err)
      }
    }
    this.state = {
      user: user,
      token: token
    }
  }
  setToken = (newValue) => {
    this.setState({ 'token': newValue, 'user': ( newValue ? jwt_decode(newValue) : null)})
  }
  render() {
    let menu = ''
    if (this.state.user){
      menu =   <Menu user={this.state.user} />
    }
    return (
      <div className="wrapper">
        <Header user={this.state.user} setToken={this.setToken} />
        <div className='content-wrapper'>
          <BrowserRouter>
            {menu}
            <Switch>
              <Route path="/register" >
                <Register user={this.state.user} />
              </Route>
              <Route path="/login" render={(props) => <Login setToken={this.setToken} user={this.state.user} {...props} />} />
              <Route path="/home" render={(props) => <Home user={this.state.user} {...props} />} />
              <Route path="/addhouse" render={(props) => <AddHouse user={this.state.user} {...props} />} />
              <Route path="/edithouse" render={(props) => <EditHouse user={this.state.user} {...props} />} />
              <Route path="/dashboard" render={(props) => <Chart user={this.state.user} {...props} />} />
              <Route path="/listhouse" render={(props) => <ListHouse user={this.state.user} setToken={this.setToken} {...props} />} />
              <Route path="/500" render={(props) => <Page500  {...props} />} />
              <Route path="/:unknown">
                <Page404 />
              </Route>

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
        <Footer user={this.state.user} />
      </div>
    );
  }
}

export default App;
