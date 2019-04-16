import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import { fetchCategoryPosts } from '../actions/CategoryAction'
import sortBy from 'sort-by';

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
    return (
      <div className="App">
        <button onClick={ () => this.changeOrder( '-voteScore' ) }>
          Order by vote score
        </button>
        <button onClick={ () => this.changeOrder( 'title' ) }>
          Order by title
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