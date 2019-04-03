import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCategoryPosts } from '../actions/CategoryAction'
import _ from 'underscore'
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

  render() {
    const { categoriesPosts } = this.props
    const { category } = this.state
    const categoryPosts = categoriesPosts[category]
    let content = (<p>No posts found for {category}</p>)
    if ( this.hasPostOnCategory() ) {
      content = (
         <ul>
          { categoryPosts.posts.sort().map( post => (

            <li key={post.id}><b>{ post.title }</b> - vote: { post.voteScore }</li>
          ))}
        </ul>
      )
    }
    return (
      <div className="App">
        <button onClick={ () => this.changeOrder( 'title' ) }>
          Order by Name
        </button>
        { content }
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