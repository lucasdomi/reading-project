import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/PostActions';
import {Link} from 'react-router-dom';
import sortBy from 'sort-by'

class Posts extends Component {
  state = {
    order: '-voteScore'
  }

  changeOrder = order => (
    this.setState({
      order
    })
  )
  
  componentWillMount() {
    this.props.fetchPosts()
  }

  getIdPost () {
    const { posts } = this.props
    let postsContent = posts.ids.map( id => ( posts[id] ) )
    return postsContent
  }

  render() {
    const posts = this.getIdPost();
    const { order } = this.state
    let page = ''
    if (posts.length) {
     page = ( 
      <ul>
        { posts.sort(sortBy(order)).filter(post => post.deleted === false).map( post => (
          <li key={post.id}>
            <Link to={`${post.category}/${post.id}`}>{ post.title }</Link> - vote: { post.voteScore }
          </li>
        ))}
      </ul>)
    }
    return (
      <div className="App">
        <button onClick={ () => this.changeOrder( '-voteScore' ) }>
          Order by vote score
        </button>
        <button onClick={ () => this.changeOrder( 'title' ) }>
          Order by title
        </button>
        { page }
        <div>
          <Link to={'/post/create'}>New Post</Link>
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
    fetchPosts: () => dispatch(fetchPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)