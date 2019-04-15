import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/PostActions';
import {Link} from 'react-router-dom';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts()
  }

  listPosts () {
    const { posts } = this.props
    if ( posts.items.length > 0) {
      return (
         <ul>
          { posts.items.map( post => (
            <li key={post.id}>
              <Link to={`${post.category}/${post.id}`}>{ post.title }</Link> - vote: { post.voteScore }
            </li>
          ))}
        </ul>
      )
    }
    else {
      return (
        <p>No post found</p>
      )
    }
  }

  getIdPost () {
    const { posts } = this.props
    let postsContent = posts.ids.map( id => ( posts[id] ) )
    return postsContent
  }

  render() {
    const posts = this.getIdPost();
    let page = ''
    if (posts.length) {
     page = ( 
      <ul>
        { posts.filter(post => post.deleted === false).map( post => (
          <li key={post.id}>
            <Link to={`${post.category}/${post.id}`}>{ post.title }</Link> - vote: { post.voteScore }
          </li>
        ))}
      </ul>)
    }
    return (
      <div className="App">
        { page }
        <div>
          <Link to={'/post/create'}>New Post</Link>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts)