import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Categories from './components/Categories';
import Posts from './components/Posts';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Categories}/>
        <Route exact path="/posts" component={Posts}/>
      </Switch>
    );
  }
}

export default App