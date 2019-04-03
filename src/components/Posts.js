import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/PostActions';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts()
  }

  render() {
    const { posts } = this.props
    let contentPost = ''
    if ( posts.items.length > 0) {
      contentPost = (
         <ul>
          { posts.items.map( post => (
            <li key={post.id}>{ post.title }</li>
          ))}
        </ul>
      )
    }
    return (
      <div className="App">
        { contentPost }
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