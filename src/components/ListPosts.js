import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/PostActions';
import {Link} from 'react-router-dom';
import sortBy from 'sort-by'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ThumbUp, ThumbDown } from '@material-ui/icons'
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
      <Fragment>
        {posts.sort(sortBy(order)).filter(post => post.deleted === false).map( post => (
        <Card style={{margin: "20px"}}>
          <CardContent>
            <Typography variant="headline" component="h2">
              { post.title }
            </Typography>
            <Typography color="textSecondary">
              { post.category }
            </Typography>
            <Typography color="textSecondary">
              { post.author }
            </Typography>
            <Typography component="p">
              { post.body }
            </Typography>
            <Typography component="p">
              { post.commentCount } comments
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to ={`${post.category}/${post.id}`} color="primary" size="small">Read More</Button>
            <div>
              <ThumbUp onClick = { () => this.handleVote('upVote')} style={{ color: 'green'}}/>
              <span>{ post.voteScore }</span>
              <ThumbDown onClick = { () => this.handleVote('downVote')} style={{ color: 'red' }} />
            </div>
          </CardActions>
        </Card>
        ))}
      </Fragment>
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