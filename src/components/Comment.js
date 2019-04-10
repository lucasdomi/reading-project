
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPostComments } from '../actions/CommentAction'

class Comments extends Component {

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

  comments () {
    const comments = this.postComments()
    let content;
    if ( comments ) {
      content = comments.sort().map( comment => (
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)