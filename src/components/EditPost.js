import React, {Component} from 'react';
import { createPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryAction'
import { fetchPost } from '../actions/PostActions';
import { connect } from 'react-redux'
import uuid from 'uuid';

class EditPost extends Component {
  state = {
    post : {
      id: this.props.post.content && this.props.post.content.id || '',
      title: this.props.post.content && this.props.post.content.title || '',
      category: this.props.post.content && this.props.post.content.category  || '',
      body: this.props.post.content && this.props.post.content.body || '',
      author: this.props.post.content && this.props.post.content.author || '',
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
    const postBody = {...this.state.post, timestamp: Date.now(), id:uuid.v1()}
    this.props.createPost(postBody)
  }

  render () {
    return (
      <div>
        <form autoComplete="off">
          <label>
            Title:
            <input type="text" name="title" 
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
            <input type="text" name="author" 
              onChange={(e) => this.handleChange(e)}
              />
          </label>

          <label>
            Content:
            <textarea name="body" 
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
      createPost: post => dispatch( createPost( post ) ),
      fetchCategories: () => dispatch( fetchCategories() ),
      fetchPost: postId => dispatch (fetchPost(postId))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(EditPost)