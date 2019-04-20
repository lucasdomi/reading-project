import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from  'react-router-dom'
import { ratePost } from '../actions/PostActions'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThumbUp, ThumbDown } from '@material-ui/icons'
import Moment from 'react-moment';
import "../css/Card.css";
import "../css/ListPosts.css";
import "../css/PostPage.css";

class CardComponent extends Component {
    
  handleVote = vote => {
    const { id } = this.props.post
    console.log("teste de props",id)
    this.props.ratePost(id, vote)
  }

  render() {
    const {post } = this.props;
    return (
      <Card style={{margin: "20px", minWidth: "330px", maxWidth: "370px"}}>
        <CardContent>
          <Typography variant="headline" component="h2">
            { post.title }
          </Typography>
          <Typography color="textSecondary">
            { post.category }
          </Typography>
          <Typography color="textSecondary">
            { post.author } - 
            <Moment
              style={{marginLeft: "5px"}}
              format="DD/MM/YYYY HH:mm">
              {post.timestamp}
            </Moment>
          </Typography>
          <Typography component="p">
            { post.body }
          </Typography>
          <Typography variant="caption">
            { post.commentCount } comments
          </Typography>
        </CardContent>
        <CardActions className="card-action">
          <Button component={Link} to ={`${post.category}/${post.id}`} color="primary" size="small">Read More</Button>
          <div className="voteScore">
            <ThumbUp onClick = { () => this.handleVote('upVote')} className="vote-positive"/>
            <span>{ post.voteScore }</span>
            <ThumbDown onClick = { () => this.handleVote('downVote')} className="vote-negative" />
          </div>
        </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ratePost: ( postId, vote ) => dispatch ( ratePost( postId, vote ) ),
  }
}

export default connect(null, mapDispatchToProps)(CardComponent)
