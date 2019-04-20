import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost, ratePost, deletePost } from '../actions/PostActions'
import { Link } from 'react-router-dom';
import Comment from "./ListComments";
import { ThumbUp, ThumbDown } from '@material-ui/icons'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuDrawer from './MenuDrawer';
import Moment from 'react-moment';
import "../css/Card.css";
import "../css/PostPage.css";

class PostPage extends Component {


  componentDidMount() {
    const { postId } = this.props.match.params
    !this.props.posts[postId] && this.props.fetchPost( postId )
  }

  handleDelete = () => {
    const { postId } = this.props.match.params
    this.props.deletePost(postId)
    this.props.history.push('/')
  }

  handleVote = vote => {
    const { postId } = this.props.match.params
    this.props.ratePost(postId, vote)
  }

  render() {
    const { postId } = this.props.match.params
    const post = this.props.posts[postId]
    let page = (<p>No posts found</p>)
    if ( post ) {
      page = (
        <div>
          <div>
            <div className="title">
              <h1 className="title-post" >{post.title}</h1>
              <Button size="small" variant="outlined" className="space">
                <Link to={`/post/edit/${post.id}`}>Edit</Link>
              </Button>
              <Button size="small" onClick = {this.handleDelete} variant="contained" color="secondary">
                Delete Post
                <DeleteIcon/>
              </Button>
            </div>
            <p>{post.category}</p>
            <p>
            <b>Author:</b> {post.author} <b>- created </b>
            <Moment
              className="space"
              format="DD/MM/YYYY HH:mm">
              {post.timestamp}
            </Moment>
            </p>
            
            <p>{ post.body }</p>
            <div className="voteScore">
              <ThumbUp onClick = { () => this.handleVote('upVote')} className="vote-positive"/>
              <span>{ post.voteScore }</span>
              <ThumbDown onClick = { () => this.handleVote('downVote')} className="vote-negative" />
            </div>
          </div>
          <Comment postId={ post.id } />
        </div>
      )
    }
    return (
      <div>
        <div className="App">
          {post ?
          <MenuDrawer namePage="Post details" editPost backPost={post.category}/>
          : 
          <MenuDrawer namePage="Post details" backToHome editPost />}
          { page }
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
    fetchPost: postId => dispatch( fetchPost(postId)),
    ratePost: ( postId, vote ) => dispatch (ratePost(postId, vote)),
    deletePost: postId => dispatch(deletePost(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
