import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editComment, rateComment, deleteComment } from '../actions/CommentAction'
import { ThumbUp, ThumbDown } from '@material-ui/icons'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';
class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: props.comment.body,
      edit: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.comment !== prevProps.comment) {
      this.setState({
        ...this.state,
        body: this.props.comment.body
      })
    }
  }

  handleEdit = () => {
    this.setState({
      ...this.state,
      edit: !this.state.edit,
    })
  }

  handleCommentBody = (event) => {
    this.setState({
      ...this.state,
      body: event.target.value
    })
  }

  handleVote = vote => {
    console.log(this.props.comment.id)
    this.props.rateComment(this.props.comment.id, vote)
  }

  handleDelete = () => {
    const { deleteComment, comment } = this.props
    deleteComment(comment.id)
  }
  
  submitComment = () => {
    const { comment, editComment } = this.props
    const commentData = { body: this.state.body, timestamp: Date.now(), id: comment.id }
    editComment( commentData )
    this.setState({
      ...this.state,
      edit: false,
    })
  }

  render() {
    const { comment } = this.props
    const {edit, body} = this.state
    return (
      <div>
        <Button size="small" variant="outlined" onClick={this.handleEdit}>
          Edit
        </Button>
        <Button size="small" onClick = {this.handleDelete} variant="contained" color="secondary">
            Delete
          <DeleteIcon/>
        </Button>
        <p>
          {comment.author} - created 
          <Moment
            style={{marginLeft: "5px"}}
            format="DD/MM/YYYY HH:mm">
            
            {comment.timestamp}
          </Moment>
          </p>
          { edit ?
        <div>
            <label>
              Content:
              <textarea value={ body }
                onChange={(e) => this.handleCommentBody(e)}
              />
            </label>
            <button onClick={this.submitComment}>
              Confirmar 
            </button> 
          </div> :
          <p>{comment.body}</p>
        }
        <div className="voteScore">
          <span>Votes:{ comment.voteScore }</span>
          <ThumbUp onClick = { () => this.handleVote('upVote')} style={{ color: 'green'}}/>
          <ThumbDown onClick = { () => this.handleVote('downVote')} style={{ color: 'red' }} />
        </div>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editComment: commentData => dispatch(editComment(commentData)),
    rateComment: (commentId, vote) => dispatch(rateComment(commentId,vote)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
  }
}

export default connect(null, mapDispatchToProps)(Comment)