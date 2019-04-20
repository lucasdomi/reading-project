import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/PostActions';
import sortBy from 'sort-by'
import Card from '../components/Card';
import Button from '@material-ui/core/Button';
import "../css/PostPage.css";
import "../css/ListPosts.css";

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
        <div style={{display: 'flex'}}>
          {posts.sort(sortBy(order)).filter(post => post.deleted === false).map( post => (
            <Card key={post.id} post={post}/>
          ))}        
        </div>
        )
    }
    return (
      <div className="App">
        <div className="list-order">
          <Button onClick={() => this.changeOrder('-voteScore')} >
            Order by vote score
          </Button>
          <Button onClick={() => this.changeOrder('title')}>
            Order by title
          </Button>
        </div>
        <div className="card">
          {page}
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