
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost } from '../actions/PostActions'

class PostPage extends Component {

  componentDidMount() {
    const { postId } = this.props.match.params
    this.props.fetchPost(postId)
  }

  render() {
    const { post } = this.props
    let content = (<p>No posts found</p>)
    if ( post.content ) {
      content = (
        <div>
          <p>{post.content.title}</p>
          <p>{post.content.author}</p>
          <p>{post.content.timestamp}</p>
          <p>{post.content.voteScore}</p>
          <p>{ post.content.body }</p>
        </div>
      )
    }
    return (
      <div className="App">
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => {
  return {
    post,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: ( postId ) => dispatch( fetchPost( postId ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)