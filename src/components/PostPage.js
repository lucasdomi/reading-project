
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost } from '../actions/PostActions'
import Comment from "../components/Comment";
class PostPage extends Component {

  componentDidMount() {
    const {postId} = this.props.match.params
    this.props.fetchPost(postId)
  }

  InfosPost () {
    const { post } = this.props
    if (post.content) {
      return (
        <div>
          <p>{post.content.title}</p>
          <p>{post.content.author}</p>
          <p>{post.content.timestamp}</p>
          <p>{post.content.voteScore}</p>
          <p>{post.content.body }</p>
          <Comment postId={post.content.id}/>
        </div>
      )
    }
    else {
      return (
        <p>No posts found</p>
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.InfosPost()}
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