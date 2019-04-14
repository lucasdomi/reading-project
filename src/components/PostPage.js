
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost, ratePost } from '../actions/PostActions'
import { Link } from 'react-router-dom';
import { deletePost } from '../api/post';
import Comment from "../components/Comment";
import { ThumbUp, ThumbDown } from '@material-ui/icons'

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

  handleVote = vote => {
    const { postId } = this.props.match.params
    this.props.ratePost(postId, vote)
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
          <div>
            <ThumbUp onClick = { () => this.handleVote('upVote')} style={{ color: 'green'}}/>
            <span>{ post.items.voteScore }</span>
            <ThumbDown onClick = { () => this.handleVote('downVote')} style={{ color: 'red' }} />
          </div>
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
    ratePost: ( postId, vote ) => dispatch ( ratePost( postId, vote ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)