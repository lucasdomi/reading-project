import React, { Component } from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import HomePage from "./components/HomePage"
import Posts from './components/ListPosts';
import CategoryPage from './components/CategoryPage';
import PostPage from "./components/PostPage";
import NewPost from "./components/NewPost";
import EditPost from './components/EditPost';
import {fetchPosts} from './actions/PostActions'
class App extends Component {
  
  componentDidMount() {
    this.props.fetchPosts()
  }
  
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/posts" component={Posts}/>
        <Route exact path="/post/create" component={ NewPost } />
        <Route exact path="/post/edit/:postId" component={ EditPost } />
        <Route exact path="/:category" render={(props ) => (
          <CategoryPage key={props.match.params.category} {...props }/>
        ) } />
        <Route exact path="/:category/:postId" component={ PostPage } />
      </Switch>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch( fetchPosts() ),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))