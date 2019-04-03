import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import HomePage from "./components/HomePage"
import Posts from './components/Posts';
import CategoryPage from './components/CategoryPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/posts" component={Posts}/>
        <Route exact path="/:category" component={ CategoryPage } />
      </Switch>
    );
  }
}

export default App