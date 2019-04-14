import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editComment, rateComment } from '../actions/CommentAction'
import { ThumbUp, ThumbDown } from '@material-ui/icons'

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
        <button onClick={ this.handleEdit }>Editar</button>

        <p>{ comment.author }</p>
        
        <div>
          <ThumbUp onClick = { () => this.handleVote('upVote')} style={{ color: 'green'}}/>
          <span>Votes:{ comment.voteScore }</span>
          <ThumbDown onClick = { () => this.handleVote('downVote')} style={{ color: 'red' }} />
        </div>
        <p>{comment.timestamp}</p>
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
          <p>{comment.body}</p>}
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editComment: commentData => dispatch( editComment( commentData ) ),
    rateComment: ( commentId, vote ) => dispatch( rateComment( commentId, vote ) ),
  }
}

export default connect(null, mapDispatchToProps)(Comment)