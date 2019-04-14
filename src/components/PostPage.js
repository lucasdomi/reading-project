
// import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { fetchPost, ratePost } from '../actions/PostActions'
// import { Link } from 'react-router-dom';
// import { deletePost } from '../api/post';
// import Comment from "../components/Comment";
// import { ThumbUp, ThumbDown } from '@material-ui/icons'

// class PostPage extends Component {

//   componentDidMount() {
//     const {postId} = this.props.match.params
//     !this.props.posts[postId] && this.props.fetchPost(postId)
//   }
  
//   delete = () => {
//     const {postId} = this.props.match.params
//     deletePost(postId)
//     this.props.history.push('/')
//   }

//   handleVote = vote => {
//     const { postId } = this.props.match.params
//     this.props.ratePost(postId, vote)
//   }

//   render() {
//     const { postId } = this.props.match.params
//     const { post } = this.props.posts[postId]
//     let content = (<p>No posts found</p>)
//     if (post) {
//       content = (
//         <div>
//           <Link to={`/post/edit/${post.id}`}>Editar</Link>
//           <button onClick={this.delete}>Deletar</button>
//           <p>{post.title}</p>
//           <p>{post.author}</p>
//           <p>{post.timestamp}</p>
//           <p>{post.voteScore}</p>
//           <p>{post.body }</p>
//           <div>
//             <ThumbUp onClick = { () => this.handleVote('upVote')} style={{ color: 'green'}}/>
//             <span>{ post.voteScore }</span>
//             <ThumbDown onClick = { () => this.handleVote('downVote')} style={{ color: 'red' }} />
//           </div>
//           <Comment postId={post.id}/>

//         </div>
//       )
//     }
//     return (
//       <div className="App">
//         {content}
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ posts }) => {
//   return {
//     posts,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchPost: ( postId ) => dispatch( fetchPost( postId ) ),
//     ratePost: ( postId, vote ) => dispatch ( ratePost( postId, vote ) ),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(PostPage)


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost, ratePost } from '../actions/PostActions'
import { Link } from 'react-router-dom';
import { deletePost } from '../api/post';
import Comment from "./ListComments";
import { ThumbUp, ThumbDown } from '@material-ui/icons'

class PostPage extends Component {

  componentDidMount() {
    const { postId } = this.props.match.params
    !this.props.posts[postId] && this.props.fetchPost( postId )
  }

  handleDelete = () => {
    const { postId } = this.props.match.params
    deletePost(postId)
    this.props.history.push('/')
  }

  handleVote = vote => {
    const { postId } = this.props.match.params
    this.props.ratePost(postId, vote)

  }

  render() {
    const { postId } = this.props.match.params
    const post = this.props.posts[postId]
    let content = (<p>No posts found</p>)
    if ( post ) {
      content = (
        <div>
          <h1>{post.title}</h1>
          <Link to={`/post/edit/${post.id}`}>Edit</Link>
          <button onClick={ this.handleDelete }>Delete</button>
          <p>{post.author}</p>
          {post.timestamp}
          <p>{ post.body }</p>
          <div>
            <ThumbUp onClick = { () => this.handleVote('upVote')} style={{ color: 'green'}}/>
            <span>{ post.voteScore }</span>
            <ThumbDown onClick = { () => this.handleVote('downVote')} style={{ color: 'red' }} />
          </div>
          <Comment postId={ post.id } />
        </div>
      )
    }
    return (
      <div>
        <div className="App">
          { content }
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
    fetchPost: postId => dispatch( fetchPost( postId ) ),
    ratePost: ( postId, vote ) => dispatch ( ratePost( postId, vote ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
