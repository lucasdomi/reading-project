import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import { fetchCategoryPosts, fetchCategories } from '../actions/CategoryAction'
import sortBy from 'sort-by';
import MenuDrawer from './MenuDrawer';
import Button from '@material-ui/core/Button';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import "../css/PostPage.css";
import "../css/ListPosts.css";
import "../css/Card.css";

class CategoryPage extends Component {
  state = {
    category: '',
    order: '-voteScore'
  }

  componentDidMount() {
    const { category } = this.props.match.params
    this.setState({
      category
    })
    !this.hasPostOnCategory() && this.props.fetchCategoryPosts( category )
  }


  changeOrder = order => (
    this.setState({
      order
    })
  )

  hasPostOnCategory = () => {
    const categoryPosts = this.props.categoriesPosts[this.state.category]
    return (categoryPosts && categoryPosts.posts.length)
  }

  infoCategories () {
    const { categoriesPosts } = this.props
    const { category, order } = this.state
    const categoryPosts = categoriesPosts[category]
    if ( this.hasPostOnCategory() ) {
      return (
        <List>
        {categoryPosts.posts.sort(sortBy(order)).map( post => (
          <ListItem style={{marginBottom: '10px', display: "flex",justifyContent: "center"}}>
            <div className="list-order" style={{ flexDirection: "column", alignItems: "center"}}>
              <Link to={`${category}/${post.id}`}> {post.title} </Link> 
              <span>Vote Score: { post.voteScore }</span>
            </div>
          </ListItem>
        ))}
        </List>
      )
    }
    else {
      return (
        <p>No have post in category</p>
      )
    }
  }

  render() {
    const { category, order } = this.state
    return (
      <div>
        <MenuDrawer category={category} backToHome/>
        <div className="list-order">
          <Button onClick={() => this.changeOrder('-voteScore')} >
            Order by vote score
          </Button>
          <Button onClick={() => this.changeOrder('title')}>
            Order by title
          </Button>
        </div>
        <div className="list-order">
          { this.infoCategories() }
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ categoriesPosts, categories }) => {
  return {
    categoriesPosts,
    categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategoryPosts: ( category ) => dispatch( fetchCategoryPosts( category ) ),
    fetchCategories: () => dispatch(fetchCategories()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)