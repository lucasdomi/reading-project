import React, {Component} from 'react';
import { editPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryAction'
import { connect } from 'react-redux'

class EditPost extends Component {
  state = {
    post : {
      title: '',
      body: '',
      author: '',
      category: '',
    } 
  }

  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
    const { postId } = this.props.match.params
    console.log(this.props)
    const post = this.props.posts[postId]
    if (post) {
      this.setState({
        ...this.state,
        post
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts !== this.props.posts) {
      const { postId } = this.props.match.params
      const post = this.props.posts[postId]
      this.setState({
        ...this.state,
        post
      })
    }
  }
  

  fetchCategories () {
    const { categories } = this.props
    let fetchCategories = '';
    fetchCategories = categories.items.map (category => (
      <option key={category.path} value={category.name}>{category.name}</option>
    ))
    return fetchCategories;
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [event.target.name]: event.target.value
      }
    })
  }

  submitPost = event => {
    const { post } = this.state
    this.props.editPost( post )
  }

  render () {
    return (
      <div>
        <form autoComplete="off">
          <label>
            Title:
            <input type="text" name="title" value={this.state.post.title}
              onChange={(e) => this.handleChange(e)}
            />
          </label>

          <label>
            Category:
            <select
              name="category" 
              value={this.state.post.category || ''} 
              onChange={(e) => this.handleChange(e)}
            >
              {this.fetchCategories()}
            </select>
          </label>
          
          <label>
            Author:
            <input type="text" name="author" value={this.state.post.author || ''}
              onChange={(e) => this.handleChange(e)}
              />
          </label>

          <label>
            Content:
            <textarea name="body" value={this.state.post.body || ''}
              onChange={(e) => this.handleChange(e)}
            />
          </label>

          <button onClick={this.submitPost}>
            Send
          </button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch( editPost( post ) ),
    fetchCategories: () => dispatch( fetchCategories() ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)