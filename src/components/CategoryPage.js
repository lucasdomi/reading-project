import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import { fetchCategoryPosts } from '../actions/CategoryAction'
// import _ from 'underscore'
class CategoryPage extends Component {
  state = {
    category: '',
  }

  componentDidMount() {
    const { category } = this.props.match.params
    this.setState({
      category
    })
    !this.hasPostOnCategory() && this.props.fetchCategoryPosts( category )
  }

  hasPostOnCategory = () => {
    const categoryPosts = this.props.categoriesPosts[this.state.category]
    return (categoryPosts && categoryPosts.posts.length)
  }

  infoCategories () {
    const { categoriesPosts } = this.props
    const { category } = this.state
    const categoryPosts = categoriesPosts[category]
    if ( this.hasPostOnCategory() ) {
      return (
         <ul>
          { categoryPosts.posts.sort().map( post => (
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
    return (
      <div className="App">
        <button onClick={ () => this.changeOrder( 'title' ) }>
          Order by Name
        </button>
        { this.infoCategories() }
      </div>
    );
  }
}

const mapStateToProps = ({ categoriesPosts }) => {
  return {
    categoriesPosts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategoryPosts: ( category ) => dispatch( fetchCategoryPosts( category ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)