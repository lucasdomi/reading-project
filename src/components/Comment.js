
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPostComments, newComment } from '../actions/CommentAction'
import uuid from 'uuid'

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

  postComments = () => {
    const { postsComments, postId } = this.props
    if (postsComments && postsComments[postId]) {
      return postsComments[postId].items
    }
  }

  sendComment = () =>  {
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

  comments () {
    const comments = this.postComments()
    let content;
    if (comments) {
      content = comments.map( comment => (
        <div>
          <p>{ comment.author }</p>
          <p>{ comment.body }</p>
          <p>Votes: { comment.voteScore }</p>
          <p>{comment.timestamp}</p>
        </div>
      ))
      return content;
    }
    else {
      content = <p>No comments</p>
      return content;
    }
  }
  render() {
    return (
      <div className="comments">
        <h1>Comments</h1>
        { this.comments() }
        <div>
          <form autoComplete="off">
            <label>
                Author:
                <input type="text" name="author"  value={ this.state.comment.author }
                  onChange={(e) => this.handleComment(e)}
                  />
            </label>
            <label>
                Content:
                <textarea name="body" value={ this.state.comment.body }
                  onChange={(e) => this.handleComment(e)}
                />
            </label>
            <button onClick={() => this.sendComment()}>
              Send
            </button>
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