import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import HomePage from './components/HomePage';

class App extends Component {
  render() {
    return (
      <Route exact path="/" component={HomePage}/>
    );
  }
}

export default App