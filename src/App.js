import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import HomePage from "./components/HomePage"
import Posts from './components/ListPosts';
import CategoryPage from './components/CategoryPage';
import PostPage from "./components/PostPage";
import NewPost from "./components/NewPost";
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/posts" component={Posts}/>
        <Route exact path="/post/create" component={ NewPost } />
        <Route exact path="/:category" component={ CategoryPage } />
        <Route exact path="/:category/:postId" component={ PostPage } />
      </Switch>
    );
  }
}

export default App