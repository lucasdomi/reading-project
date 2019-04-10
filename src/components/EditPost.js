import React, {Component} from 'react';
import { editPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryAction'
import { fetchPost } from '../actions/PostActions';
import { connect } from 'react-redux'

class EditPost extends Component {
  state = {
    post : {
      id: this.props.post && this.props.post.id || '',
      title: this.props.post && this.props.post.title || '',
      category: this.props.post && this.props.post.category  || '',
      body: this.props.post && this.props.post.body || '',
      author: this.props.post && this.props.post.author || '',
    } 
  }

  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
    this.props.fetchPost(this.props.match.params.postId)
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
              value={this.state.post.category} 
              onChange={(e) => this.handleChange(e)}
            >
              {this.fetchCategories()}
            </select>
          </label>
          
          <label>
            Author:
            <input type="text" name="author" value={this.state.post.author}
              onChange={(e) => this.handleChange(e)}
              />
          </label>

          <label>
            Content:
            <textarea name="body" value={this.state.post.body}
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

const mapStateToProps = ({ categories, post }) => {
  return {
    categories,
    post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch( editPost( post ) ),
    fetchCategories: () => dispatch( fetchCategories() ),
    fetchPost: postId => dispatch( fetchPost( postId ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)