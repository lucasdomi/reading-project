import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import { fetchCategoryPosts, fetchCategories } from '../actions/CategoryAction'
import sortBy from 'sort-by';
import MenuDrawer from './MenuDrawer';
import Button from '@material-ui/core/Button';

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
    console.log("minha categoria",category)
    const categoryPosts = categoriesPosts[category]
    if ( this.hasPostOnCategory() ) {
      return (
         <ul>
          { categoryPosts.posts.sort(sortBy(order)).map( post => (
            <li key={post.id}>
              <Link to={`${category}/${post.id}`}> {post.title} </Link> - vote: { post.voteScore }
            </li>
          ))}
        </ul>
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
      <div className="App">
        <MenuDrawer category={category} backToHome/>
        <h1>{category && category}</h1>
        <Button onClick={() => this.changeOrder('-voteScore')} >
          Order by vote score
        </Button>
        <Button onClick={() => this.changeOrder('title')}>
          Order by title
        </Button>
        { this.infoCategories() }
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