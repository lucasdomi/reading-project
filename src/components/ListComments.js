
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPostComments, newComment } from '../actions/CommentAction'
import uuid from 'uuid'
import CommentPage from './CommentPage';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

class Comments extends Component {

  state = {
    comment: {
      author: '',
      body: '',
    }
  }

  componentDidMount() {
    const { postId } = this.props
    this.props.fetchPostComments( postId )
  }

  sendComment = (e) =>  {
    e.preventDefault();
    const commentData = {...this.state.comment, timestamp: Date.now(), id: uuid.v1(), parentId: this.props.postId }
    this.props.newComment(commentData)
    this.setState({
      comment: {
        body: '',
        author: '',
      }
    })
  }

  handleComment = event => {
    this.setState({
      comment: {
        ...this.state.comment,
        [event.target.name]: event.target.value
      }
    })
  }

  postComments = () => {
    const { postsComments, postId } = this.props
    const comments = postsComments[postId]
    if (!comments) {
      return comments
    }
    return comments.ids.map( id => (
      comments[id]
    ))
  }

  render() {
    const comments = this.postComments()
    return (
      <div className="comments">
        <h1>Comments</h1>
          { comments && comments.filter( comment => comment.deleted === false).map( comment => (
          <CommentPage
            key={ comment.id }
            comment={ comment }
          />
        ))
      }
        <div>
          <form autoComplete="off">
            <h3>New Comment</h3>
            <TextField
              id="author"
              name="author"
              label="Author"
              // value={ this.state.comment.author }
              // fullWidth
              margin="normal"
              onBlur={(e) => this.handleComment(e)}
            />
            <TextField
              id="content"
              name="body"
              label="Content"
              placeholder="Content"
              // value={ this.state.comment.body }
              multiline
              rows={2}
              rowsMax={4}
              onBlur={(e) => this.handleComment(e)}
            />
            <Button variant="contained" size="small" color="primary" onClick={(e) => this.sendComment(e)}>
              Send
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ postsComments }) => {
  return {
    postsComments,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPostComments: (postId) => dispatch( fetchPostComments( postId ) ),
    newComment: commentData => dispatch( newComment( commentData ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)