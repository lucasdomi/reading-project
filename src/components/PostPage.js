
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost } from '../actions/PostActions'
import { Link } from 'react-router-dom';
import { deletePost } from '../api/post';
import Comment from "../components/Comment";
class PostPage extends Component {

  componentDidMount() {
    const {postId} = this.props.match.params
    this.props.fetchPost(postId)
  }
  
  delete = () => {
    const postId = this.props.post.items.id
    deletePost(postId)
    this.props.history.push('/')

  }

  InfosPost () {
    const { post } = this.props
    if (post.items) {
      return (
        <div>
          <Link to={`/post/edit/${post.items.id}`}>Editar</Link>
          <button onClick={this.delete}>Deletar</button>
          <p>{post.items.title}</p>
          <p>{post.items.author}</p>
          <p>{post.items.timestamp}</p>
          <p>{post.items.voteScore}</p>
          <p>{post.items.body }</p>
          <Comment postId={post.items.id}/>
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